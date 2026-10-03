import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/it';
import { motion } from "framer-motion";
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
      const response = await fetch(`${baseURL}/publicHolidaysV2`, {
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
  }, []);

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
      <Row className="mb-2">
        <Col>
          {/* <FaRegCalendarCheck size={35} className="text-primary" /> */}
          <div>
            <h3>
              Festività italiane
            </h3>
            <p>Consulta tutte le festività nazionali dell’anno selezionato.</p>
          </div>
        </Col>
      </Row>

      <Row className="nationalholidays-controls mb-4">
        <Col xs={12} md={3}>
          <Button
            variant="primary"
            onClick={fetchHolidays}
            disabled={loading}
            className="w-100 nationalholidays-btn"
            aria-label="Mostra feste nazionali"
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Mostra feste nazionali'}
          </Button>
        </Col>
        <Col xs={12} md={3} >
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
            className="form-control text-center fw-bold"
            placeholderText="Seleziona anno"
            wrapperClassName="datepicker-wrapper"
          />
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
              <motion.div
                  initial={{opacity:0, y:20}}
                  animate={{opacity:1, y:0}}
                  transition={{duration:.3}}>
                <div className="nationalholidays-card shadow-sm">
                  <div className="holiday-content">
                    <h5>{h.nome}</h5>
                    <div className="mt-2">
                      <strong>{h.giornoSettimana}</strong>
                      <span className="ms-2 text-muted">
                        {h.giorno}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
