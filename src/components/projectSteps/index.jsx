import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ProjectSteps({ step1, step2, step3 }) {
   return (
      <Nav className="justify-content-center mb-4">
         <Nav.Item>
            {step1 ? (
               <LinkContainer to='/client'>
                  <Nav.Link>Client</Nav.Link>
               </LinkContainer>
            ) : <Nav.Link disabled>Client</Nav.Link>}
         </Nav.Item>

         <Nav.Item>
            {step2 ? (
               <LinkContainer to='/project'>
                  <Nav.Link>Project</Nav.Link>
               </LinkContainer>
            ) : <Nav.Link disabled>Project</Nav.Link>}
         </Nav.Item>

         <Nav.Item>
            {step3 ? (
               <LinkContainer to='/phase'>
                  <Nav.Link>Phases</Nav.Link>
               </LinkContainer>
            ) : <Nav.Link disabled>Phases</Nav.Link>}
         </Nav.Item>
      </Nav>
   )
}

export default ProjectSteps
