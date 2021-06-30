import React from 'react'
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

// Local Imports
import FormContainer from '../components/formContainer';

function NewUserScreen() {
   const submitHandler = () => 
   {
      console.log("Handling")
   }

   return (
      <FormContainer>
         <h1 className="font--light text-center">NEW USER</h1>
         <Form onSubmit={submitHandler}>
            <Row>
               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="firstName" className="my-3">
                     <Form.Label>FIRST NAME</Form.Label>
                     <Form.Control type="text" placeholder="Enter first name" />
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="lastName" className="my-3">
                     <Form.Label>LAST NAME</Form.Label>
                     <Form.Control type="text" placeholder="Enter last name" />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="email" className="my-3">
                  <Form.Label>EMAIL ADDRESS</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
               </Form.Group>
            </Row>
            
            <Row>
               <Form.Group controlId="password" className="my-3">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
               </Form.Group>
            </Row>

            <Row>
               <Form.Group controlId="phoneNumber" className="my-3">
                  <Form.Label>PHONE NUMBER</Form.Label>
                     <InputGroup className="mb-2 mr-sm-2">
                     <InputGroup.Prepend>
                        <InputGroup.Text>+212</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type="text" placeholder="Enter phone number" />
                     </InputGroup>
                  
               </Form.Group>
            </Row>

            <Row className="mb-3">
               <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={3}>
                  USER TYPE
                  </Form.Label>
                  <Col sm={10}>
                  <Form.Check
                     type="radio"
                     label="Director"
                     name="userTypeRadios"
                     id="director"
                  />
                  <Form.Check
                     type="radio"
                     label="Project Manager"
                     name="userTypeRadios"
                     id="projectManager"
                  />
                  <Form.Check
                     type="radio"
                     label="Secretary"
                     name="userTypeRadios"
                     id="secretary"
                  />
                  <Form.Check
                     type="radio"
                     label="Accounting Manager"
                     name="userTypeRadios"
                     id="accountingManager"
                  />
                  </Col>
               </Form.Group>
            </Row>
            
            <Button type="submit" variant="primary">ADD</Button>
         </Form>
      </FormContainer>
   )
}

export default NewUserScreen
