import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Local Imports
import './Header.css'

function Header() {
   return (
      <header>
         <Navbar variant="dark" className="bg-primary m-auto" expand="lg" collapseOnSelect>
            <Container>
               {/* Nav Logo */}
               <LinkContainer to="/">
                     <Navbar.Brand href="/">PLANNY</Navbar.Brand>
               </LinkContainer>
                  
                  {/* Nav Links */}
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                     <LinkContainer to="/cart">
                        <Nav.Link>Dashboard</Nav.Link>
                     </LinkContainer>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
