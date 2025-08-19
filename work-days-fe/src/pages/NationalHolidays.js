import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/it';
import { FaRegCalendarCheck } from 'react-icons/fa';
import './NationalHolidays.css';

const NationalHolidays = ({ baseURL, giorni }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  moment.locale('it');

  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/publicHolidays`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
      });
      if (!response.ok) throw new Error('Errore nel caricamento delle feste nazionali');
      const data = await response.json();
      setHolidays(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setYear(startDate.getFullYear());
  }, [startDate]);

  useEffect(() => {
    fetchHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const formattedData = holidays.map(h => {
    const dateObj = new Date(h.date);
    return {
      giorno: moment(dateObj).format('L'),
      giornoSettimana: giorni.find(d => dateObj.getDay() === d.value)?.name || '',
      nome: h.localName
    };
  });

  return (
    <Container className="nationalholidays-container">
      <Row className="mb-4">
        <Col>
          <h3>Feste Nazionali in Italia {year}</h3>
          <p>Elenco delle festività italiane con giorno e data.</p>
        </Col>
      </Row>

      <Row className="holidays-controls mb-4">
        <Col xs={12} md={4} className="mb-2">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
            className="form-control"
            aria-label="Seleziona anno"
          />
        </Col>
        <Col xs={12} md={3}>
          <Button
            variant="primary"
            onClick={fetchHolidays}
            disabled={loading}
            className="w-100"
            aria-label="Mostra feste nazionali"
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Mostra feste nazionali'}
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <p style={{ color: 'red' }}>Errore: {error}</p>
          </Col>
        </Row>
      )}

      <Row className="g-3">
        {formattedData.length ? (
          formattedData.map((h, idx) => (
            <Col xs={12} md={6} lg={4} key={idx}>
              <div className="holiday-card">
                <div>
                  <h5 className="card-title">{h.nome}</h5>
                  <p className="card-text">{h.giorno} - {h.giornoSettimana}</p>
                </div>
                <div className="d-flex justify-content-end align-items-center mt-3">
                  {/* <Badge bg="info" text="white" className="holiday-badge">
                    <FaRegCalendarCheck /> Festività
                  </Badge> */}
                </div>
              </div>
            </Col>
          ))
        ) : !loading && (
          <Col>
            <p>Nessuna festività trovata per l'anno selezionato.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default NationalHolidays;
