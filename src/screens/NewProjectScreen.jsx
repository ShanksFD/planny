import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

// Local Imports
import FormContainer from '../components/FormContainer';
import ProjectSteps from '../components/ProjectSteps';
import {registerProject} from "../actions/projectActions"

function NewProjectScreen({history}) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [price, setPrice] = useState("");

   const dispatch = useDispatch()
   const {clientId} = useSelector(state => state.clientRegister)
   const projectRegister = useSelector(state => state.projectRegister)

   const submitHandler = (e) => {
      e.preventDefault()

      if(clientId)
      {
         dispatch(registerProject({
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            price: price,
            client_id: clientId
         }))
      }
   } 

   useEffect(() => {
      if(projectRegister && projectRegister.success)
         history.push("/")
   }, [projectRegister, history])
   
   return (
      <FormContainer>
         <ProjectSteps step1 step2/>

         <h1 className="font--light text-center">NEW PROJECT</h1>
         <Form onSubmit={submitHandler}>
            <Row>
               <Col>
                  <Form.Group controlId="title" className="my-3">
                     <Form.Label>TITLE</Form.Label>
                     <Form.Control type="text" placeholder="Project title" value={title} onChange={((e) => {
                        setTitle(e.target.value)
                     })}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="description" className="my-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Project description" value={description} onChange={((e) => {
                        setDescription(e.target.value)
                     })}/>
               </Form.Group>
            </Row>
            
            <Row>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="startDate" className="my-3">
                     <Form.Label>START DATE</Form.Label>
                     <Form.Control type="date" value={startDate} onChange={((e) => {
                        setStartDate(e.target.value)
                     })}/>
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="endDate" className="my-3">
                     <Form.Label>END DATE</Form.Label>
                     <Form.Control type="date" value={endDate} onChange={((e) => {
                        setEndDate(e.target.value)
                     })}/>
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="price" className="my-3">
                  <Form.Label>PRICE</Form.Label>
                  <Form.Control type="text" placeholder="Price" value={price} onChange={((e) => {
                        setPrice(e.target.value)
                     })}/>
               </Form.Group>
            </Row>

            
            <Button type="submit" variant="primary">SAVE</Button>
         </Form>
      </FormContainer>
   )
}

export default NewProjectScreen
