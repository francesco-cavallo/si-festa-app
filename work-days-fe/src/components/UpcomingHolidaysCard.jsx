import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import { Calendar3 } from "react-bootstrap-icons";
import { FaUmbrellaBeach } from "react-icons/fa";
import "./HolidayCard.css";

const UpcomingHolidaysCard = ({ baseURL, giorni }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(holidays);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentYear = new Date().getFullYear();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Festività anno corrente
      const response = await fetch(`${baseURL}/publicHolidaysV2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: currentYear }),
      });
      if (!response.ok)
        throw new Error("Errore nel caricamento delle feste nazionali");
      let data = await response.json();
      // Solo festività da oggi in poi
      let upcomingHolidays = data
        .filter((holiday) => new Date(holiday.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      // Se non sono sufficienti, recupera l'anno successivo
      if (upcomingHolidays.length < 3) {
        const nextResponse = await fetch(`${baseURL}/publicHolidaysV2`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ year: currentYear + 1 }),
        });
        if (!nextResponse.ok)
          throw new Error(
            "Errore nel caricamento delle feste nazionali dell'anno successivo",
          );
        const nextYearData = await nextResponse.json();
        upcomingHolidays = [
          ...upcomingHolidays,
          ...nextYearData.sort((a, b) => new Date(a.date) - new Date(b.date)),
        ];
      }
      // Mantieni solo le prossime 3
      const nextHolidays = upcomingHolidays.slice(0, 3).map((h) => ({
        ...h,

        giorno: new Date(h.date).toLocaleDateString("it-IT", {
          weekday: "long",
        }),

        fromToday: Math.ceil(
          (new Date(h.date) - today) / (1000 * 60 * 60 * 24),
        ),
      }));
      setHolidays(nextHolidays);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-4 holiday-card">
      <Card.Body>
        {/* Titolo */}
        <Card.Title className="d-flex align-items-center m-0 mb-3">
          <FaUmbrellaBeach
            style={{
              color: "#358620",
              marginRight: "0.5rem",
            }}
          />
          Prossime festività
        </Card.Title>

        {/* Lista festività */}
        <div className="upcoming-holidays">
          {holidays.map((holiday, index) => (
            <div
              key={index}
              className="upcoming-holiday-row d-flex align-items-center"
            >
              <div className="holiday-date">
                {holiday.date} - {holiday.giorno}
              </div>

              <div className="holiday-name flex-grow-1">
                <strong>{holiday.localName}</strong>
              </div>
              <div className="holiday-days">
                {holiday.fromToday}{" "}
                {holiday.fromToday === 1 ? "giorno" : "giorni"}
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UpcomingHolidaysCard;
