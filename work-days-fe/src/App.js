// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const baseURL = 'http://localhost:3001'

function App() {

  // Da migliorare:
  //  magari l'input dell'anno può essere una select

  const d = new Date();
  const currentYear = d.getFullYear()

  const [ year, setYear ] = useState(currentYear)
  console.log('year', year);

  const handleChange = e => {
    const target = e.target
    setYear(target.value)
  }

  function longWeekend() {
    fetch(`${baseURL}/longWeekend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ currentYear })
      // body: JSON.stringify({ input.value })
      body: JSON.stringify({ year })
    })
      .then(data => data.json())
      .then(json => alert(JSON.stringify(json, null, 2)))
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Si Festa!</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#publicHolidays">Feste nazionali</Nav.Link>
              <Nav.Link href="#longWeekends">Weekend lunghi</Nav.Link>
              <NavDropdown title="Altre funzioni" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">
                  Le prossime feste
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  È festa oggi?
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card>
        <Card.Body>
        <Button variant="primary" onClick={countryInfo}>Prova</Button>
          <Button variant="primary" onClick={countryInfo}>Country info (Italy only)</Button>
          <Button variant="primary" onClick={longWeekend}>Weekend lunghi (Italy only)</Button>
          <Button variant="primary" onClick={publicHolidays}>Feste nazionali (2024 - Italy only)</Button>
          <Button variant="primary" onClick={isTodayPublicHoliday}>È festa oggi? (Italy only)</Button>
          <Button variant="primary" onClick={nextPublicHolidays}>Le prossime feste (Italy only)</Button>
          <Button variant="primary" onClick={nextPublicHoliday}>La prossima festa (Italy only)</Button>
          <table>
            <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange}/>
            {/* <button onClick={availableCountries}>availableCountries (first only)</button> */}
          </table>
        </Card.Body>
        <Card.Footer className="text-muted" style={{textAlign: "center"}}>
          Powered by <a href='#FrancescoCavallo' 
                        class="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover">
                          Francesco Cavallo
                      </a> (and some <a href='https://react.dev' rel="noopener noreferrer"
                                  class="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover" 
                                  target={'_blank'}> React</a>)
        </Card.Footer>
      </Card>
    </>
  );
}

// function availableCountries() {
//   fetch(`${baseURL}/availableCountries`, {
//     method: 'GET'
//   })
//     .then(data => data.json())
//     .then(json => alert(JSON.stringify(json, null, 2)))
// }

function countryInfo() {
  fetch(`${baseURL}/countryInfo`, {
    method: 'GET'
  })
    .then(data => data.json())
    .then(json => alert(JSON.stringify(json, null, 2)))
}

function publicHolidays() {
  fetch(`${baseURL}/publicHolidays`, {
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

export default App;
