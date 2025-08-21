import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/it';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { BsChevronDown, BsChevronUp, BsSliders } from 'react-icons/bs';
import "./LongWeekend.css";
import LongWeekendFilters from '../components/LongWeekendFilters';
import Collapse from 'react-bootstrap/Collapse';

const LongWeekend = ({ baseURL, giorni }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [bridgeDays, setBridgeDays] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedCards, setExpandedCards] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    moment.locale('it');

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
      fetchLongWeekend()
    }, [])

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
            <Row className="mb-2">
                <Col>
                    <h3>Scopri i tuoi weekend lunghi del {year}</h3>
                    <p>Consulta subito quali giorni festivi e ponti ti permettono di goderti più tempo libero durante l'anno.</p>
                </Col>
            </Row>
            {/* Sezione filtri */}
            <Row className="mb-3 align-items-center justify-content-center">
                <Col xs="auto">
                    <Button
                    variant="primary"
                    onClick={fetchLongWeekend}
                    disabled={loading}
                    className="longweekend-btn"
                    aria-label="Mostra weekend lunghi"
                    >
                    {loading ? <Spinner animation="border" size="sm" /> : "Mostra weekend lunghi"}
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button 
                        variant="outline-secondary"
                        onClick={() => setShowFilters(!showFilters)}
                        aria-expanded={showFilters}
                        aria-controls="filters-section"
                        className='filters-btn'
                    >
                    <BsSliders className="me-2" />
                    {showFilters ? "Nascondi filtri" : "Mostra filtri"}
                    </Button>
                </Col>
            </Row>
            {/* Sezione filtri a scomparsa */}
            <Collapse in={showFilters} mountOnEnter unmountOnExit>
                <div className="filters-section">
                    <LongWeekendFilters
                        startDate={startDate}
                        setStartDate={setStartDate}
                        bridgeDays={bridgeDays}
                        setBridgeDays={setBridgeDays}
                    />
                </div>
            </Collapse>
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
    