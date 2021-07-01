import React from 'react'
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";

// Local Imports
import './Header.css'
import { logout } from "../../actions/userActions";
import {ADMINISTRATOR_PERM, SECRETARY_PERM, DIRECTOR_PERM, ACCOUNTING_MANGER_PERM, PROJECT_MANAGER_PERM} from '../../utils'

function Header() {
   const dispatch = useDispatch();


   const {userInfo} = useSelector(state => state.userLogin)
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
                  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                     <Nav>
                           <Navbar.Text className="mx-1 text-white">WELCOME, {userInfo.first_name} /</Navbar.Text>

                           <Navbar.Text className="mx-1 text-white">
                              Signed in as: <span className="text-muted">{( userInfo.is_admin ? ADMINISTRATOR_PERM
                                                                           : userInfo.is_director ? DIRECTOR_PERM
                                                                           : userInfo.is_accountingManager ? ACCOUNTING_MANGER_PERM
                                                                           : userInfo.is_projectManager ? PROJECT_MANAGER_PERM
                                                                           : userInfo.is_secretary ? SECRETARY_PERM
                                                                           : "Root")} /</span>
                           </Navbar.Text>
                           
                           <LinkContainer to="/">
                              <Nav.Link onClick={logoutHandler} className="text-white mx-1 ">LOG OUT</Nav.Link>
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
