import React from 'react'
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";

// Local Imports
import FormContainer from '../components/FormContainer';
import ProjectSteps from '../components/projectSteps';

function NewClientScreen({history}) {

   const submitHandler = (e) => {
      e.preventDefault()

      history.push('/project')
   } 

   return (
      <FormContainer>
         <ProjectSteps step1 />

         <h1 className="font--light text-center">NEW CLIENT</h1>
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
               <Form.Group controlId="website" className="my-3">
                  <Form.Label>WEBSITE</Form.Label>
                  <Form.Control type="text" placeholder="Enter website url" />
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

            
            <Button type="submit" variant="primary">SAVE</Button>
         </Form>
      </FormContainer>
   )
}

export default NewClientScreen
