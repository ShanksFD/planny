import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";

// Local Imports
import FormContainer from '../components/FormContainer';

function NewPhaseScreen({history}) {

   const submitHandler = (e) => {
      e.preventDefault()

      history.push('/phases')
   } 

   return (
      <FormContainer>
         <h1 className="font--light text-center">NEW PHASE</h1>
         <Form onSubmit={submitHandler}>
            <Row>
               <Col>
                  <Form.Group controlId="label" className="my-3">
                     <Form.Label>LABEL</Form.Label>
                     <Form.Control type="text" placeholder="Phase label" />
                  </Form.Group>
               </Col>

            </Row>

            <Row>
               <Form.Group controlId="description" className="my-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="Phase description" />
               </Form.Group>
            </Row>
            
            <Row>
               <Form.Group controlId="description" className="my-3">
                  <Form.Label>EMPLOYEES</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="Empolyees" />
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
               <Form.Group controlId="price" className="my-4">
                  <Form.Label>PRICE</Form.Label>
                  <Form.Control type="text" placeholder="Price"/>
               </Form.Group>
            </Row>
            
            <Button type="submit" variant="primary" className="my-2">SAVE</Button>
            <Button type="submit" variant="primary"  className="mx-3">SAVE AND ADD ANOTHER</Button>
         </Form>
      </FormContainer>
   )
}

export default NewPhaseScreen
