import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import CountryInfoCard from "../components/CountryInfoCard"
import TodayHolidayCard from "../components/TodayHolidayCard"
import NextHolidaysCard from "../components/NextHolidaysCard"
import LongWeekendsCard from "../components/LongWeekendsCard";
import UpcomingHolidaysCard from "../components/UpcomingHolidaysCard"
import "./Homepage.css"

const Homepage = ({ baseURL, giorni }) => {
    return (
        <Container fluid className="py-4 homepage">
            <div className="hero text-center mb-5">
                <h1 className="fw-bold">Scopri quando è festa</h1>
                <p className="text-muted fs-5">
                    Organizza i tuoi weekend lunghi e ponti
                </p>
            </div>
            <Row className="g-4 align-items-start">
                <Col sm={12} md={12} lg={12}>
                    <TodayHolidayCard baseURL={baseURL} giorni={giorni}/>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <LongWeekendsCard baseURL={baseURL}/>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <NextHolidaysCard baseURL={baseURL} giorni={giorni}/>
                </Col>
                <Col sm={12} md={12} lg={12}>
                    <UpcomingHolidaysCard baseURL={baseURL} giorni={giorni}/>
                </Col>
                <Col sm={12} md={12} lg={12}>
                    <CountryInfoCard baseURL={baseURL}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage
