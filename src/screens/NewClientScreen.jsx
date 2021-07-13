import React, { useState } from 'react'
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { useDispatch } from 'react-redux';


// Local Imports
import { registerClient } from '../actions/clientActions';
import FormContainer from '../components/FormContainer';
import ProjectSteps from '../components/ProjectSteps';

function NewClientScreen({history}) {
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [website, setWebsite] = useState("");


   const dispatch = useDispatch()

   const submitHandler = (e) => {
      e.preventDefault()

      dispatch(registerClient({
         first_name: firstName,
         last_name: lastName,
         email: email,
         phone_number: phoneNumber,
         website: website
      }))
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
                     <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                        }}/>
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="lastName" className="my-3">
                     <Form.Label>LAST NAME</Form.Label>
                     <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                        }}/>
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="email" className="my-3">
                  <Form.Label>EMAIL ADDRESS</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        }}/>
               </Form.Group>
            </Row>
            
            <Row>
               <Form.Group controlId="website" className="my-3">
                  <Form.Label>WEBSITE</Form.Label>
                  <Form.Control type="text" placeholder="Enter website url" value={website} onChange={(e) => {
                        setWebsite(e.target.value)
                        }}/>
               </Form.Group>
            </Row>

            <Row>
               <Form.Group controlId="phoneNumber" className="my-3">
                  <Form.Label>PHONE NUMBER</Form.Label>
                     <InputGroup className="mb-2 mr-sm-2">
                     <InputGroup.Prepend>
                        <InputGroup.Text>+212</InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => {
                        setPhoneNumber(e.target.value)
                        }}/>
                     </InputGroup>
               </Form.Group>
            </Row>

            
            <Button type="submit" variant="primary" disabled={!(firstName && lastName && email && website && phoneNumber)}>SAVE</Button>
         </Form>
      </FormContainer>
   )
}

export default NewClientScreen
