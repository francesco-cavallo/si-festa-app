import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import CountryInfoCard from "../components/CountryInfoCard"
import TodayHolidayCard from "../components/TodayHolidayCard"
import NextHolidayCard from "../components/NextHolidayCard"
import LongWeekendsCard from "../components/LongWeekendsCard";
import "./Homepage.css"

const Homepage = ({ baseURL, giorni }) => {
    return (
        <Container fluid className="py-4 homepage">
            <div className="hero text-center mb-5">
                <h1 className="fw-bold">Benvenuto su <span className="text-primary">Si Festa!</span></h1>
                <p className="text-muted fs-5">
                    Scopri se oggi è festa, pianifica i tuoi weekend lunghi e tieni d’occhio le prossime vacanze.
                </p>
            </div>
            <Row className="g-4 align-items-start">
                <Col sm={12} md={6} lg={4}>
                    <LongWeekendsCard baseURL={baseURL}/>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <CountryInfoCard baseURL={baseURL}/>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <TodayHolidayCard baseURL={baseURL}/>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <NextHolidayCard baseURL={baseURL} giorni={giorni}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage
