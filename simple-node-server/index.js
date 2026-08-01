// Setup server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// API request
const axios = require("axios");

const app = express();
const port = 3001;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ENV variables
const baseURL = "https://nagerholidays.com/api/v3/";
const countryCode = "it";
const year = "2024";

// APIs
// AvailableCountries
app.get("/availableCountries", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}AvailableCountries`,
    headers: {
      accept: "text/plain",
    },
  };
  axios
    .request(config)
    .then((response) => {
      res.send(response.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

// CountryInfo
app.get("/countryInfo", (req, res) => {
  // countryCode va reso editabile
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}countryInfo/${countryCode}`,
    headers: {
      accept: "text/plain",
    },
  };
  axios
    .request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// LongWeekend
app.post("/longWeekend", async (req, res) => {
  console.log("\nChiamo /longWeekend");
  const { year, bridgeDays } = req.body;

  let url = `${baseURL}longWeekend/${year}/${countryCode}`;

  if (Number.isInteger(bridgeDays) && bridgeDays > 0) {
    url += `?availableBridgeDays=${bridgeDays}`;
  }

  try {
    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });
    res.send(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).send(error.response?.data);
  }
});

app.post("/longWeekendV2", async (req, res) => {
  try {
    const { year, startDate, endDate, bridgeDays } = req.body;

    // Se c'è solo year (caso default)
    if (year && !startDate && !endDate) {
      let url = `${baseURL}LongWeekend/${year}/${countryCode}`;
      if (bridgeDays >= 0) url += `?availableBridgeDays=${bridgeDays}`;
      const response = await axios.get(url, {
        headers: { accept: "text/plain" },
      });
      return res.json(response.data);
    }

    // Caso periodi custom
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Per i periodi custom servono startDate e endDate" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || start > end) {
      return res
        .status(400)
        .json({ error: "Date non valide o startDate > endDate" });
    }

    const results = [];

    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
      let url = `${baseURL}LongWeekend/${y}/${countryCode}`;
      if (bridgeDays >= 0) url += `?availableBridgeDays=${bridgeDays}`;

      try {
        const response = await axios.get(url, {
          headers: { accept: "text/plain" },
        });
        // filtro per periodo custom
        const filtered = response.data.filter((item) => {
          const itemStart = new Date(item.startDate);
          const itemEnd = new Date(item.endDate);
          return itemEnd >= start && itemStart <= end; // anche se il weekend "taglia" il periodo
        });
        results.push(...filtered);
      } catch (err) {
        console.error(`Errore per anno ${y}:`, err.message);
      }
    }

    res.json(results);
  } catch (error) {
    console.error("Errore generico:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

app.post("/longWeekendV3", async (req, res) => {
  console.log("\nChiamo /longWeekendV3");
  console.log(
    `\Parametri: bridgedays ${req.body.bridgeDays} - year ${req.body.year}`,
  );
  try {
    const { year, startDate, endDate, bridgeDays } = req.body;
    console.log("startDate: ", startDate, "endDate: ", endDate);
    // Caso default: anno singolo
    if (year && !startDate && !endDate) {
      let url = `${baseURL}LongWeekend/${year}/${countryCode}`;
      if (bridgeDays) {
        url += `?availableBridgeDays=${bridgeDays}`;
      }
      const response = await axios.get(url, {
        headers: { accept: "text/plain" },
      });
      return res.json(response.data);
    }

    // Caso periodi custom
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Per i periodi custom servono startDate e endDate" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || start > end) {
      return res
        .status(400)
        .json({ error: "Date non valide o startDate > endDate" });
    }
    const years = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++)
      years.push(y);

    const promises = years.map(async (y) => {
      let url = `${baseURL}LongWeekend/${y}/${countryCode}`;
      if (bridgeDays >= 0) url += `?availableBridgeDays=${bridgeDays}`;
      try {
        const response = await axios.get(url, {
          headers: { accept: "text/plain" },
        });
        return response.data
          .filter((item) => {
            const itemStart = new Date(item.startDate);
            const itemEnd = new Date(item.endDate);
            return itemEnd >= start && itemStart <= end;
          })
          .map((item) => {
            const itemStart = new Date(item.startDate);
            const itemEnd = new Date(item.endDate);

            // Calcolo mesi coinvolti
            const months = [];
            let current = new Date(itemStart);
            while (current <= itemEnd) {
              months.push(current.getMonth() + 1); // Mesi 1-12
              current.setMonth(current.getMonth() + 1);
            }

            return {
              ...item,
              monthsInPeriod: months.filter((m) => {
                const d = new Date(itemStart.getFullYear(), m - 1, 1);
                return d >= start && d <= end;
              }),
            };
          });
      } catch (err) {
        console.error(`Errore per anno ${y}:`, err.message);
        return [];
      }
    });

    const resultsArrays = await Promise.all(promises);
    const results = resultsArrays.flat();

    res.json(results);
  } catch (error) {
    console.error("Errore generico:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// PublicHolidays
app.post("/publicHolidays", (req, res) => {
  const anno = req.body.year;
  let config = {
    method: "get",
    maxBodyLength: `Infinity`,
    url: `${baseURL}PublicHolidays/${anno}/${countryCode}`,
    headers: { accept: "text/plain" },
  };
  axios
    .request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// isTodayPublicHoliday
app.get("/isTodayPublicHoliday", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}isTodayPublicHoliday/${countryCode}`,
    headers: {
      accept: "*/*",
    },
  };

  axios
    .request(config)
    .then((response) => {
      if (JSON.stringify(response.status) === "200") {
        console.log("è festa");
        res.send({ isFesta: "Yes" });
      } else if (JSON.stringify(response.status) === "204") {
        res.send({ isFesta: "No" });
      } else {
        console.log("ERRORE");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// nextPublicHolidays
app.post("/nextPublicHolidays", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}nextPublicHolidays/${countryCode}`,
    headers: {
      accept: "text/json",
    },
  };
  axios
    .request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// nextPublicHoliday
app.get("/nextPublicHoliday", (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}nextPublicHolidays/${countryCode}`,
    headers: {
      accept: "text/json",
    },
  };
  axios
    .request(config)
    .then((response) => {
      res.send(response.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`),
);
