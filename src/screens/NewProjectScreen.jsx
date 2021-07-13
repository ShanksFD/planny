import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"

// Local Imports
import FormContainer from '../components/FormContainer';
import ProjectSteps from '../components/ProjectSteps';
import {registerProject} from "../actions/projectActions"
import {getProjectManagerList} from "../actions/userActions"
import Message from '../components/Message';

function NewProjectScreen({history}) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [price, setPrice] = useState("");
   const [managerId, setManager] = useState(-1)
   const [message, setMessage] = useState("")

   const {register, handleSubmit} = useForm();
   const dispatch = useDispatch()
   const {clientId} = useSelector(state => state.clientRegister)
   const projectRegister = useSelector(state => state.projectRegister)
   const projectManagerList = useSelector(state => state.projectManagerList)

   const submitHandler = (e, data) => {
      e.preventDefault()

      if(clientId)
      {
         dispatch(registerProject({
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            price: price,
            client_id: clientId,
            // FIXME: get default projectManager using another SAFE WAY :)
            manager_id: managerId === -1 ? projectManagerList.users[0].uid : managerId,
            files: data.files
         }))
      }
   } 

   const submitFiles = (data, event) => {
      
      if(data.files.length === 0)
         setMessage("Please upload a valid files")
      else
      {
         setMessage("")
         submitHandler(event, data)
      }            
   }
      
   useEffect(() => {
      dispatch(getProjectManagerList())

      if(projectRegister && projectRegister.success)
         history.push("/")
   }, [projectRegister, history, dispatch])
   
   return (
      <FormContainer>
         <ProjectSteps step1 step2/>

         <h1 className="font--light text-center">NEW PROJECT</h1>
         {message && <Message variant="warning">{message}</Message>}

         <Form onSubmit={handleSubmit(submitFiles)}>
            <Row>
               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="title" className="my-3">
                     <Form.Label>TITLE</Form.Label>
                     <Form.Control required type="text" placeholder="Project title" value={title} onChange={((e) => {
                        setTitle(e.target.value)
                     })}
                     />
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="manager" className="my-3">
                     <Form.Label>PROJECT MANAGER LIST</Form.Label>
                        <Form.Control required as="select" onChange={(e) => {
                        setManager(e.target.value && 0)
                     }}>
                     {  !projectManagerList.error && 
                           projectManagerList.users.map((u) => (
                              <option key={u.uid} value={u.uid}>{u.first_name}  {u.last_name}</option>
                           ))
                        }
                     </Form.Control>
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="description" className="my-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control required as="textarea" rows={3} placeholder="Project description" value={description} onChange={((e) => {
                        setDescription(e.target.value)
                     })}/>
               </Form.Group>
            </Row>
            
            <Row>
              <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="startDate" className="my-3">
                     <Form.Label>START DATE</Form.Label>
                     <Form.Control required type="date" value={startDate} onChange={((e) => {
                        setStartDate(e.target.value)
                     })}/>
                  </Form.Group>
               </Col>

               <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="endDate" className="my-3">
                     <Form.Label>END DATE</Form.Label>
                     <Form.Control required type="date" value={endDate} onChange={((e) => {
                        setEndDate(e.target.value)
                     })}/>
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Form.Group controlId="price" className="my-3">
                  <Form.Label>PRICE</Form.Label>
                  <Form.Control required type="text" placeholder="Price" value={price} onChange={((e) => {
                        setPrice(e.target.value)
                     })}/>
               </Form.Group>
            </Row>

            <Row>
               <Form.Group controlId="files" className="my-3">
                  <Form.Label style={{display: "block"}}>FILES</Form.Label>
                  <Form.Control required type="file"  {...register("files")} multiple/>
               </Form.Group>
            </Row>
            <Button type="submit" variant="primary" disabled={projectManagerList.error || projectManagerList.users.length === 0}>SAVE</Button>
         </Form>
      </FormContainer>
   )
}

export default NewProjectScreen
