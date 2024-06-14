import React, { useState } from 'react'
// import { useState } from "react";
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Homepage = (props) => {
    const { baseURL } = props
    // da rinominare
    const [res, setRes] = useState('')
    const [publicHoliday, setPublicHoliday] = useState('')

    function countryInfo() {
        fetch(`${baseURL}/countryInfo`, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(json => {
                setRes([json])
            })
    }
    const infoNazione = res && res.length ? res.map(elem => {
            const { 
                region,
                officialName,
                countryCode,
                commonName,
                borders } = elem
            const confini = borders.map(conf => {
                return {
                    continente: conf.region,
                    nomeUff: conf.officialName,
                    codice: conf.countryCode,
                    nome: conf.commonName
                }
            })
        return {
            continente: region,
            nomeUff: officialName,
            codice: countryCode,
            nome: commonName,
            confini
        }
    })[0]: undefined

    console.log('infoNazione', infoNazione);
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
            .then(json => {
                setPublicHoliday([json])
            })
    }
    const nextHoliday = publicHoliday && publicHoliday.length ? publicHoliday.map(elem => {
        return elem
    })[0] : undefined

    const dataProva = nextHoliday ? new Date() : undefined
    console.log(dataProva);

    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Container fluid>
                        <Row>
                            <Col sm={3}>
                                <Button variant="primary" onClick={countryInfo}>Country info (Italy only)</Button>
                            </Col>
                            <Col sm={8}>
                                {JSON.stringify(infoNazione)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm>
                                <Button variant="primary" onClick={isTodayPublicHoliday}>È festa oggi? (Italy only)</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm>
                                <Button variant="primary" onClick={nextPublicHolidays}>Le prossime feste (Italy only)</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <Button variant="primary" onClick={nextPublicHoliday}>La prossima festa (Italy only)</Button>
                            </Col>
                            <Col sm={8}>
                                {nextHoliday ? nextHoliday.localName + ' - ' + nextHoliday.date : undefined}
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    )
}

export default Homepage