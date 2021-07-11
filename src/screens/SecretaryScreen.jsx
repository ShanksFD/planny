import React from 'react'
import { Col, Row, Button, Form, FormControl} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

// Local imports

function SecretaryScreen() {
   return (
      <>
         <Row>
            <Col className="py-4">
               <h4>Select project to change</h4>
            </Col>
         </Row>

         <Form>
            <Row>
               <Col lg={5} md={5} xs={5} sm={5}>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
               </Col >

               <Col lg={5} md={4} xs={3} sm={4}>
                  <Button>Search</Button>
               </Col>

               <Col lg={2} md={3} xs={4} sm={3}>
                  <LinkContainer to="/client" >
                     <Button >ADD PROJECT</Button>
                  </LinkContainer>
               </Col>
            </Row>
         </Form>
      </>
   )
}

export default SecretaryScreen
