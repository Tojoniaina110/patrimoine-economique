import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

function CustomNavbar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={Link} to="/" className="font-weight-bold">PATRIMOINE ECONOMIQUE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          <Nav.Link as={Link} to="/">Page des Possessions</Nav.Link>
          <Nav.Link as={Link} to="/possession/create">Créer une Possession</Nav.Link>
          <Nav.Link as={Link} to="/chart">Voir le Graphique</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
