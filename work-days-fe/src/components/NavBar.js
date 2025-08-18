// NavBar.js
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const isActive = (path) => location.pathname === path;

  const isDropdownActive = location.pathname.includes('/nextHolidays') || location.pathname.includes('/isTodayHoliday');

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" sticky="top" expanded={expanded}>
      <Container>
        <Navbar.Brand className="nav-title fw-semibold" href="/" onClick={handleClose}>
          Si Festa!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={`navlink fw-medium ${isActive('/') ? 'active' : ''}`}
              onClick={handleClose}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/publicHolidays"
              className={`navlink fw-medium ${isActive('/publicHolidays') ? 'active' : ''}`}
              onClick={handleClose}
            >
              Feste nazionali
            </Nav.Link>
            <Nav.Link
              href="/longWeekends"
              className={`navlink fw-medium ${isActive('/longWeekends') ? 'active' : ''}`}
              onClick={handleClose}
            >
              Weekend lunghi
            </Nav.Link>
            <NavDropdown
                title="Altre funzioni"
                id="basic-nav-dropdown"
                className={`navlink fw-medium ${isDropdownActive ? 'active' : ''}`}
            >
                <NavDropdown.Item href="/nextHolidays" className="fw-medium" onClick={handleClose}>
                    Le prossime feste
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/isTodayHoliday" className="fw-medium" onClick={handleClose}>
                    È festa oggi?
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
