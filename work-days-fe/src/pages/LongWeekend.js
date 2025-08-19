import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/it';
import { FaUmbrellaBeach } from 'react-icons/fa';
import "./LongWeekend.css";

const LongWeekend = ({ baseURL, giorni }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [startDate, setStartDate] = useState(new Date());
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    moment.locale('it');

    const fetchLongWeekend = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseURL}/longWeekend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year })
            });
            if (!response.ok) throw new Error('Errore nel caricamento dei dati');
            const data = await response.json();
            setRes(data);
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
        fetchLongWeekend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    const formattedData = res.map(elem => {
        const start = new Date(elem.startDate);
        const end = new Date(elem.endDate);

        return {
            inizio: moment(start).format('L'),
            giornoInizio: giorni.find(d => start.getDay() === d.value)?.name || '',
            fine: moment(end).format('L'),
            giornoFine: giorni.find(d => end.getDay() === d.value)?.name || '',
            giornoFerie: elem.needBridgeDay ? 'Sì' : 'No'
        };
    });

    return (
        <Container className="longweekend-container">
            <Row className="mb-4">
                <Col>
                    <h3>Scopri i tuoi weekend lunghi del 2025</h3>
                    <p>Consulta subito quali giorni festivi e ponti ti permettono di goderti più tempo libero quest’anno.</p>
                </Col>
            </Row>

            <Row className="longweekend-controls mb-4">
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
                        onClick={fetchLongWeekend}
                        disabled={loading}
                        className="w-100"
                        aria-label="Mostra weekend lunghi"
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : 'Mostra weekend lunghi'}
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
                    formattedData.map((f, idx) => (
                        <Col xs={12} md={6} lg={4} key={idx}>
                            <div
                                className="longweekend-card"
                                data-ferie={f.giornoFerie}
                            // style={{
                            //   backgroundColor: f.giornoFerie === 'Sì' ? '#6f42c1' : '#198754',
                            //   color: 'white',
                            // }}
                            >
                                <div>
                                    <h5 className="card-title">Inizio</h5>
                                    <p className="card-text">{f.inizio} - {f.giornoInizio}</p>
                                    <h5 className="card-title">Fine</h5>
                                    <p className="card-text">{f.fine} - {f.giornoFine}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <Badge
                                        bg={f.giornoFerie === 'Sì' ? 'secondary' : 'dark'}
                                        text="white"
                                    >
                                        {f.giornoFerie === 'Sì' ? 'Giorno di ferie necessario' : 'No giorno di ferie necessario'}
                                    </Badge>
                                    <FaUmbrellaBeach size={20} />
                                </div>
                            </div>
                        </Col>
                    ))
                ) : !loading && (
                    <Col>
                        <p>Nessun weekend lungo trovato per l'anno selezionato.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default LongWeekend;
