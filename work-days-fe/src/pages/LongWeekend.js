import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/it';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import "./LongWeekend.css";

const LongWeekend = ({ baseURL, giorni }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [bridgeDays, setBridgeDays] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedCards, setExpandedCards] = useState({});

    moment.locale('it');
    console.log(bridgeDays)

    const fetchLongWeekend = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseURL}/longWeekend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year, bridgeDays })
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

    const toggleExpand = (idx) => {
        setExpandedCards(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const formattedData = res.map(elem => {
        const start = new Date(elem.startDate);
        const end = new Date(elem.endDate);

        return {
            inizio: moment(start).format('L'),
            giornoInizio: giorni.find(d => start.getDay() === d.value)?.name || '',
            fine: moment(end).format('L'),
            giornoFine: giorni.find(d => end.getDay() === d.value)?.name || '',
            giornoFerie: elem.needBridgeDay ? 'Sì' : 'No',
            bridgeDays: elem.bridgeDays?.map(date => ({
                data: moment(date).format('L'),
                giorno: giorni.find(d => new Date(date).getDay() === d.value)?.name || ''
            })) || []
        };
    });

    return (
        <Container className="longweekend-container">
            <Row className="mb-4">
                <Col>
                    <h3>Scopri i tuoi weekend lunghi del {year}</h3>
                    <p>Consulta subito quali giorni festivi e ponti ti permettono di goderti più tempo libero quest’anno.</p>
                </Col>
            </Row>

            <Row className="longweekend-controls mb-4">
                <Col xs={12} md={3} className="mb-2">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showYearPicker
                        dateFormat="yyyy"
                        className="form-control"
                        aria-label="Seleziona anno"
                    />
                </Col>
                <Col xs={12} md={3} className="mb-2">
                    <input
                        type="number"
                        min="0"
                        value={bridgeDays}
                        onChange={(e) => setBridgeDays(Number(e.target.value))}
                        className="form-control"
                        aria-label="Numero massimo di giorni ponte"
                        placeholder="Bridge days"
                    />
                </Col>
                <Col xs={12} md={3}>
                    <Button
                        variant="primary"
                        onClick={fetchLongWeekend}
                        disabled={loading}
                        className="w-100 longweekend-btn"
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
                            >
                                {/* Timeline */}
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <span className="dot"></span>
                                        <div>
                                            <strong>Inizio:</strong> {f.inizio} - {f.giornoInizio}
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="dot"></span>
                                        <div>
                                            <strong>Fine:</strong> {f.fine} - {f.giornoFine}
                                        </div>
                                    </div>
                                </div>

                                {/* Badge + toggle */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <Badge
                                        bg={f.giornoFerie === 'Sì' ? 'secondary' : 'dark'}
                                        text="white"
                                    >
                                        {f.giornoFerie === 'Sì' ?
                                            f.bridgeDays.length > 1 ?
                                                'Giorni di ferie necessari!' :
                                                'Giorno di ferie necessario!' :
                                            'No giorni di ferie necessari'}
                                    </Badge>
                                    <div className="d-flex align-items-center">
                                        <FaUmbrellaBeach size={20} className="me-2" />
                                        {f.giornoFerie === 'Sì' ?
                                        <Button
                                            variant="link"
                                            className="p-0 toggle-btn"
                                            onClick={() => toggleExpand(idx)}
                                            aria-label={expandedCards[idx] ? "Chiudi dettagli" : "Apri dettagli"}
                                        >
                                            {expandedCards[idx] ? <BsChevronUp /> : <BsChevronDown />}
                                        </Button> : <></>}
                                    </div>
                                </div>

                                {/* Sezione espandibile */}
                                {expandedCards[idx] && f.bridgeDays.length > 0 && (
                                <div className="bridge-days">
                                    {f.bridgeDays.length > 1 ?
                                    <h6 className="card-subtitle">Giorni ponte</h6> :
                                    <h6 className="card-subtitle">Giorno ponte</h6>}
                                    <ul className="mb-0 ps-3">
                                        {f.bridgeDays.map((b, i) => (
                                            <li key={i}>
                                            {b.data} - {b.giorno}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                )}
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
    