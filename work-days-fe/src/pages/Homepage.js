import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import CountryInfoCard from "../components/CountryInfoCard"
import TodayHolidayCard from "../components/TodayHolidayCard"
import NextHolidayCard from "../components/NextHolidayCard"
import "./Homepage.css"

const Homepage = ({ baseURL, giorni }) => {
  return (
    <Container fluid className="py-4 homepage">
      <h2 className="text-center mb-4 fw-bold">Pianifica le tue ferie!</h2>
      <Row className="g-4 align-items-start">
        <Col sm={12} md={6} lg={4}>
          <CountryInfoCard baseURL={baseURL} />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <TodayHolidayCard baseURL={baseURL} />
        </Col>
        <Col sm={12} md={6} lg={4}>
          <NextHolidayCard baseURL={baseURL} giorni={giorni} />
        </Col>
      </Row>
    </Container>
  )
}

export default Homepage
