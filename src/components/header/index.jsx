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
                  
               {userInfo && 
               <>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                     <Nav className="justify-content-end">
                           <Navbar.Text className="mx-1 text-white">WELCOME, {userInfo.first_name} /</Navbar.Text>

                           <Navbar.Text className="mx-1 text-white">
                              Signed in as: <span className="text-muted">{(userInfo.is_admin ? "Director"
                                                                        : userInfo.is_accountingManager ? "Accounting Manager" 
                                                                        : userInfo.is_projectManager ? "Project Manager" 
                                                                        : userInfo.is_secretary ? "Secretary"
                                                                        : "Root")} /</span>
                           </Navbar.Text>
                           
                           <LinkContainer to="/">
                              <Nav.Link onClick={logoutHandler} className="text-white mx-1 ">LOGOUT</Nav.Link>
                           </LinkContainer>
                   </Nav>
                  </Navbar.Collapse>
               </>
               }
            </Container>
         </Navbar>
      </header>
   )
}

export default Header
