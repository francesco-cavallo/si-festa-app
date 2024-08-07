import React, { useState } from 'react'
// import { useState } from "react";
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment'
import 'moment/locale/it'

const Homepage = (props) => {
    const { baseURL,
            giorni
     } = props
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
        moment.locale('it')
        elem.dataF = moment(elem.date).format('L')
        elem.giorno = giorni.find(el => new Date(elem.date).getDay() === el.value).name
        console.log(elem);
        return elem
    })[0] : undefined

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card border='primary'>
                            <Card.Body>
                                <Card.Title>Prova una delle seguenti funzionalità:</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>
                                            CountryInfo restituisce l'anagrafica dello stato italiano con i suoi confini
                                        </li>
                                        <li>
                                            È festa oggi? mostra se oggi è festivo o meno
                                        </li>
                                        <li>
                                            La prossima festa indica la prossima festività italiana
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Container fluid>
                                    <Row style={{marginBottom: '20px'}}>
                                        <Col sm={3}>
                                            <Button variant="primary" onClick={countryInfo}>Country info (Italy only)</Button>
                                        </Col>
                                        {infoNazione && <Col sm={8}>
                                            {/* Continente */}
                                            <Row>
                                                {"Continente: " + infoNazione.continente}
                                            </Row>
                                            {/* Nome ufficiale */}
                                            <Row>
                                                {"Nome ufficiale: " + infoNazione.nomeUff}
                                            </Row>
                                            {/* Nome */}
                                            <Row>
                                                {"Nome: " + infoNazione.nome}
                                            </Row>
                                            {/* Confini */}
                                            <Row>
                                                {"Confini: " + infoNazione.confini.map(confine => {
                                                    return `\n${confine.nome}`
                                                })}
                                            </Row>
                                        </Col>}
                                    </Row>
                                    <Row style={{marginBottom: '20px'}}>
                                        <Col sm>
                                            <Button variant="primary" onClick={isTodayPublicHoliday}>È festa oggi? (Italy only)</Button>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col sm>
                                            <Button variant="primary" onClick={nextPublicHolidays}>Le prossime feste (Italy only)</Button>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col sm={3}>
                                            <Button variant="primary" onClick={nextPublicHoliday}>La prossima festa (Italy only)</Button>
                                        </Col>
                                        <Col sm={8}>
                                            {nextHoliday ? nextHoliday.localName + ' (' + nextHoliday.dataF + ') - ' + nextHoliday.giorno  : undefined}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Homepage