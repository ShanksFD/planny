import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";

// Local Imports
import './Header.css'
import { logout } from "../../actions/userActions";

function Header() {
   const { userInfo } = useSelector(state => state.userLogin);

   const dispatch = useDispatch();

   const logoutHandler = e =>
   {
      e.preventDefault();
      dispatch(logout());
   }
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
                  {userInfo && <Nav className="mr-auto">
                     <LinkContainer to="/">
                        <Nav.Link>WELCOME, {userInfo.first_name}</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/">
                        <Nav.Link onClick={logoutHandler}>LOGOUT</Nav.Link>
                     </LinkContainer>
                  </Nav>}
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
