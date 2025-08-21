import React from "react";
import { Row, Col, Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsInfoCircle } from "react-icons/bs";

const LongWeekendFilters = ({ startDate, setStartDate, bridgeDays, setBridgeDays }) => {
    const resetFilters = () => {
        setBridgeDays(0)
        setStartDate(new Date())
    }
    return (
        <Row id="filters-section" className="longweekend-controls mb-4 p-3 border rounded">
            <Col xs={12} md={3} className="mb-2">
                <Badge className="badges mb-1 d-inline-flex align-items-center">
                    Seleziona l'anno:
                </Badge>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    className="form-control"
                    aria-label="Seleziona anno"
                />
            </Col>
            <Col xs={12} md={3} className="mb-2">
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
            <Col xs={12} md={3} className="mb-2">
                <Button className="reset-filters"
                    variant="outline-secondary"
                    size="sm"
                    onClick={resetFilters}
                >
                    Reset
                </Button>
            </Col>
        </Row>
    );
};

export default LongWeekendFilters;
