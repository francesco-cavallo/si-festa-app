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
                <Navbar.Brand className="nav-title fw-semibold" href="/">Si Festa!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav me-auto">
                        <Nav.Link className="navbar-nav navlink fw-medium" href="/">Home</Nav.Link>
                        <Nav.Link className="navbar-nav navlink fw-medium" href="/publicHolidays">Feste nazionali</Nav.Link>
                        <Nav.Link className="navbar-nav navlink fw-medium" href="/longWeekends">Weekend lunghi</Nav.Link>
                        <NavDropdown className="navbar-nav navlink fw-medium" title="Altre funzioni" id="basic-nav-dropdown">
                            <NavDropdown.Item className='fw-medium' href="/nextHolidays">
                                Le prossime feste
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='fw-medium' href="/isTodayHoliday">
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