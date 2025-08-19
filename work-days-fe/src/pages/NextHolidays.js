import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/it';
import { FaCalendarDay } from 'react-icons/fa';
import "./NextHolidays.css";

const NextHolidays = ({ baseURL, giorni }) => {
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    moment.locale('it');

    const fetchNextHolidays = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseURL}/nextPublicHolidays`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Errore nel caricamento delle festività');
            const data = await response.json();
            setRes(data.slice(0, 5));
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNextHolidays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formattedData = res.map(elem => {
        const date = new Date(elem.date);
        return {
            dataF: moment(date).format('L'),
            giorno: giorni.find(d => date.getDay() === d.value)?.name || '',
            nome: elem.localName
        };
    });

    return (
        <Container className="nextholidays-container">
            <Row className="mb-4">
                <Col>
                    <h3>Prossime festività italiane</h3>
                    <p>
                        Ecco le prossime cinque festività a partire dal giorno corrente.
                    </p>
                </Col>
            </Row>

            {loading && (
                <Row className="mb-3">
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation="border" />
                    </Col>
                </Row>
            )}

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
                            <div className="nextholidays-card">
                                <div>
                                    <h5 className="card-title">{f.nome}</h5>
                                    <p className="card-text">{f.giorno} - {f.dataF}</p>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : !loading && (
                    <Col>
                        <p style={{ textAlign: 'center' }}>Nessuna festività trovata.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default NextHolidays;
