import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import './NavBar.css'

const NavBar = () => {
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand href="/">Si Festa!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='nav__link' href="/">Home</Nav.Link>
                        <Nav.Link href="/publicHolidays">Feste nazionali</Nav.Link>
                        <Nav.Link href="/longWeekends">Weekend lunghi</Nav.Link>
                        <NavDropdown title="Altre funzioni" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/nextHolidays">
                                Le prossime feste
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/isTodayHoliday">
                                È festa oggi?
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar