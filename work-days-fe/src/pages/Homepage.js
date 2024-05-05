import React from 'react'
import { useState } from "react";
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Homepage = (props) => {
    const { baseURL } = props
    const d = new Date();
    const currentYear = d.getFullYear()

    const [year, setYear] = useState(currentYear)
    console.log('year', year);

    const handleChange = e => {
        const target = e.target
        setYear(target.value)
    }
    function countryInfo() {
        fetch(`${baseURL}/countryInfo`, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(json => alert(JSON.stringify(json, null, 2)))
    }
    function isTodayPublicHoliday() {
        fetch(`${baseURL}/isTodayPublicHoliday`, {
            method: 'GET'
        })
        // .then(data => data.json())
        // .then(json => alert(JSON.stringify(json, null, 2)))
    }
    function nextPublicHolidays() {
        fetch(`${baseURL}/nextPublicHolidays`, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(json => alert(JSON.stringify(json, null, 2)))
    }
    function nextPublicHoliday() {
        fetch(`${baseURL}/nextPublicHoliday`, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(json => alert(JSON.stringify(json, null, 2)))
    }
    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm>
                                <Button variant="primary" onClick={countryInfo}>Prova</Button>
                                <Button variant="primary" onClick={countryInfo}>Country info (Italy only)</Button>
                                <Button variant="primary" onClick={isTodayPublicHoliday}>È festa oggi? (Italy only)</Button>
                                <Button variant="primary" onClick={nextPublicHolidays}>Le prossime feste (Italy only)</Button>
                                <Button variant="primary" onClick={nextPublicHoliday}>La prossima festa (Italy only)</Button>
                                <table>
                                    <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange} />
                                </table>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    )
}

export default Homepage