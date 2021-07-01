import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";

// Local Imports
import FormContainer from '../components/FormContainer';
import ProjectSteps from '../components/projectSteps';

function NewProjectScreen({history}) {

   const submitHandler = (e) => {
      e.preventDefault()

      history.push('/phases')
   } 

   return (
      <FormContainer>
         <ProjectSteps step1 step2 />

         <h1 className="font--light text-center">NEW PROJECT</h1>
         <Form onSubmit={submitHandler}>
            <Row>
               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="title" className="my-3">
                     <Form.Label>TITLE</Form.Label>
                     <Form.Control type="text" placeholder="Project title" />
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="client" className="my-3">
                     <Form.Label>CLIENT</Form.Label>
                     <Form.Control type="text" placeholder="Client full name" />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="description" className="my-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Project description" />
               </Form.Group>
            </Row>
            
            <Row>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="startDate" className="my-3">
                     <Form.Label>START DATE</Form.Label>
                     <Form.Control type="date"/>
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="endDate" className="my-3">
                     <Form.Label>END DATE</Form.Label>
                     <Form.Control type="date"/>
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="price" className="my-3">
                  <Form.Label>PRICE</Form.Label>
                  <Form.Control type="text" placeholder="Price"/>
               </Form.Group>
            </Row>

            
            <Button type="submit" variant="primary">SAVE</Button>
         </Form>
      </FormContainer>
   )
}

export default NewProjectScreen
