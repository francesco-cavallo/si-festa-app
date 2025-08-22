import React, { useState } from "react";
import { Container, Row, Col, Badge, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsInfoCircle } from "react-icons/bs";
import { it } from 'date-fns/locale';

const LongWeekendFilters = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    bridgeDays,
    setBridgeDays
}) => {

    const [customPeriod, setCustomPeriod] = useState(false);
    const [enableStartMonth, setEnableStartMonth] = useState(false);
    const [enableEndMonth, setEnableEndMonth] = useState(false);

    const resetFilters = () => {
        setBridgeDays(0);
        setStartDate(new Date());
        setEndDate(new Date());
        setCustomPeriod(false);
        setEnableStartMonth(false);
        setEnableEndMonth(false);
    };

    const updateDate = (type, value, which) => {
        let currentDate = which === 'start' ? startDate : endDate;
        let newDate = new Date(currentDate);

        if (type === 'year') {
            newDate.setFullYear(value);
            if (which === 'start' && newDate > endDate) setEndDate(newDate);
            if (which === 'end' && newDate < startDate) setStartDate(newDate);
        }

        if (type === 'month') {
            newDate.setMonth(value);
            if (which === 'start' && newDate.getFullYear() === endDate.getFullYear() && newDate > endDate) setEndDate(newDate);
            if (which === 'end' && newDate.getFullYear() === startDate.getFullYear() && newDate < startDate) setStartDate(newDate);
        }

        if (which === 'start') setStartDate(newDate);
        else setEndDate(newDate);
    };

    return (
        <Container>
            <Row id="filters-section" className="longweekend-controls p-4 border rounded justify-content-center">
                <Row className="align-items-center justify-content-between p-2">
                    {/* Checkbox custom-period */}
                    <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                        <Badge className="badges mb-1 d-inline-flex align-items-center invisible">
                            placeholder
                        </Badge>
                        {/* <Form.Label>Periodo custom</Form.Label> */}
                        <Form.Check
                            type="switch"
                            label="Periodo custom"
                            checked={customPeriod}
                            onChange={() => setCustomPeriod(!customPeriod)}
                        />
                    </Col>
                    {/* Giorni ponte */}
                    <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 400 }}
                            overlay={
                                <Tooltip id="tooltip-bridge-days">
                                    Inserisci quanti giorni lavorativi sei disposto a prendere come ferie per creare un weekend lungo.
                                </Tooltip>
                            }
                        >
                            <Badge className="badges mb-1 d-inline-flex align-items-center">
                                Numero di giorni ponte:
                                <BsInfoCircle className="ms-2" size={12} />
                            </Badge>
                        </OverlayTrigger>
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
                    {/* SE NON CUSTOM: solo anno singolo */}
                    <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                        <Badge className={`badges mb-1 d-inline-flex align-items-center ${customPeriod ? 'opacity-50' : ''}`}
                        >
                            Anno:
                        </Badge>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showYearPicker
                            dateFormat="yyyy"
                            className="form-control"
                            aria-label="Seleziona anno"
                            disabled={customPeriod}
                        />
                    </Col>
                </Row>
                {/* SE CUSTOM: selezione anni inizio/fine e mesi opzionali */}
                {customPeriod && (
                    <>
                        {/* Custom-period-start */}
                        <Row className="align-items-center justify-content-between p-2">
                            {/* Anno inizio */}
                            <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                                <Badge className="badges mb-1 d-inline-flex align-items-center">Anno inizio:</Badge>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => updateDate('year', date.getFullYear(), 'start')}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="form-control"
                                    minDate={new Date(1900, 0, 1)}
                                    maxDate={endDate}
                                    aria-label="Seleziona anno inizio"
                                />
                            </Col>
                            {/* Checkbox mese inizio */}
                            <Col xs={12} md={3} className="mb-2 flex-column align-items-center">
                                <Badge className="badges mb-1 d-inline-flex invisible align-items-center">
                                    placeholder
                                </Badge>
                                <Form.Check
                                    type="switch"
                                    id="switch-start-month"
                                    label="Abilita mese inizio"
                                    checked={enableStartMonth}
                                    onChange={() => setEnableStartMonth(!enableStartMonth)}
                                />
                            </Col>
                            {/* Mese inizio */}
                            <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                                <Badge className="badges mb-1 d-inline-flex align-items-center">Mese inizio:</Badge>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => updateDate('month', date.getMonth(), 'start')}
                                    showMonthYearPicker
                                    dateFormat="MMMM"
                                    className="form-control border border-green"
                                    minDate={startDate}
                                    maxDate={endDate.getFullYear() === startDate.getFullYear() ? endDate : new Date(startDate.getFullYear(), 11, 1)}
                                    aria-label="Seleziona mese inizio"
                                    disabled={!enableStartMonth}
                                    locale={it}
                                />
                            </Col>
                        </Row>
                        {/* Custom-period-end */}
                        <Row className="align-items-center justify-content-between p-2">
                            {/* Anno fine */}
                            <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                                <Badge className="badges mb-1 d-inline-flex align-items-center">Anno fine:</Badge>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => updateDate('year', date.getFullYear(), 'end')}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="form-control"
                                    minDate={startDate}
                                    maxDate={new Date(2100, 11, 31)}
                                    aria-label="Seleziona anno fine"
                                />
                            </Col>
                            {/* Checkbox mese fine */}
                            <Col xs={12} md={3} className="mb-2 flex-column align-items-center">
                                <Badge className="badges mb-1 d-inline-flex align-items-center invisible">
                                    placeholder
                                </Badge>
                                <Form.Check
                                    type="switch"
                                    id="switch-end-month"
                                    label="Abilita mese fine"
                                    checked={enableEndMonth}
                                    onChange={() => setEnableEndMonth(!enableEndMonth)}
                                />
                            </Col>
                            {/* Mese fine */}
                            <Col xs={12} md={3} className="mb-2 d-flex flex-column justify-content-center">
                                <Badge className="badges mb-1 d-inline-flex align-items-center">Mese fine:</Badge>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => updateDate('month', date.getMonth(), 'end')}
                                    showMonthYearPicker
                                    dateFormat="MMMM"
                                    className="form-control"
                                    minDate={startDate.getFullYear() === endDate.getFullYear() && enableStartMonth ? startDate : new Date(endDate.getFullYear(), 0, 1)}
                                    maxDate={new Date(endDate.getFullYear(), 11, 1)}
                                    aria-label="Seleziona mese fine"
                                    disabled={!enableEndMonth}
                                    locale={it}
                                />
                            </Col>
                        </Row>
                    </>
                )}
                {/* Pulsante Reset */}
                <Row className="justify-content-center p-2">
                    <Col xs={12} md={3} className="w-100">
                        <Button
                            variant="outline-secondary"
                            onClick={resetFilters}
                            className="w-100"
                        >Reset</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default LongWeekendFilters;
