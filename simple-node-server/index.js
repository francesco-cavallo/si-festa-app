// Setup server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// API request
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ENV variables
const baseURL = 'https://date.nager.at/api/v3/'
const countryCode = 'it'
const year = '2024'

// APIs
// AvailableCountries
app.get('/availableCountries', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL}AvailableCountries`,
        headers: { 
          'accept': 'text/plain'
        }
      };
    axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data[0], null, 2));
        // eg. alert col primo risultato della lista
        res.send(response.data[0]);
        })
        .catch((error) => {
        console.log(error);
        });
    // res.send({data: 'Hello World!'});
});

// CountryInfo
app.get('/countryInfo', (req, res) => {
    // countryCode va reso editabile
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL}countryInfo/${countryCode}`,
        headers: { 
          'accept': 'text/plain'
        }
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

// LongWeekend
app.post('/longWeekend', (req, res) => {
    const anno = req.body.year
    console.log('anno', anno);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL}longWeekend/${anno}/${countryCode}`,
        headers: { 
          'accept': 'text/plain'
        }
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

// PublicHolidays
app.get('/publicHolidays', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: `Infinity`,
        url: `${baseURL}PublicHolidays/${year}/${countryCode}`,
        headers: { }
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      
})

// isTodayPublicHoliday
app.get('/isTodayPublicHoliday', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseURL}isTodayPublicHoliday/${countryCode}`,
        headers: { 
          'accept': '*/*'
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.status));
        // res.send(response)
      })
      .catch((error) => {
        console.log(error);
      });
})

app.post('/provaPOST', (req, res) => {
  const anno = req.body.year
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseURL}longWeekend/${year}/${countryCode}`,
    headers: { 
      'accept': 'text/plain'
    }
  };
  axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))