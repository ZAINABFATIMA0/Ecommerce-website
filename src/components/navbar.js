import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';

function navbar() {
    return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#cart">
              <AiOutlineShoppingCart />
            </Nav.Link>
            <Nav.Link href="#notification">
              <AiOutlineBell />
            </Nav.Link>
            <Nav.Link as={Link} to="/Login">
                Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar