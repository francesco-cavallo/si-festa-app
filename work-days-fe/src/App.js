// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
    <div className="App">
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
                  <NavDropdown.Item href="#action/3.3">
                    È festa oggi?
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <table>
        <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange}/>
        {/* <button onClick={availableCountries}>availableCountries (first only)</button> */}
        <button onClick={countryInfo}>countryInfo (Italy only)</button>
        <button onClick={longWeekend}>longWeekend (Italy only)</button>
        <button onClick={publicHolidays}>publicHolidays (2024 - Italy only)</button>
        <button onClick={isTodayPublicHoliday}>isTodayPublicHoliday (Italy only)</button>
        <button onClick={nextPublicHolidays}>nextPublicHolidays (Italy only)</button>
        <button onClick={nextPublicHoliday}>nextPublicHoliday (Italy only)</button>
      </table>
      <Card>
        <Card.Footer className="text-muted">
          Powered by Francesco Cavallo (and some React)
        </Card.Footer>
      </Card>
    </div>
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
