import React, { useEffect } from 'react'
import { Col, Row, Button, Form, FormControl, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

// Local imports
import {listProjects} from "../actions/projectActions"

function SecretaryScreen() {

   const { projects } = useSelector(state => state.projectsList)
   const dispatch = useDispatch()

   useEffect(() => {
      // List projects
      if(projects.length === 0)
         dispatch(listProjects())
   }, [dispatch, projects.length])
   return (
      <>
         <Row>
            <Col>
               <h4>Select project to change</h4>
            </Col>
         </Row>

         <Form>
            <Row className="py-4">
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

         <Table striped bordered hover responsive variant="dark" className="py-4">
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Price</th>
                  <th>Client</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {projects.map((p) => (
                  <tr key={p._id}>
                     <td>{p.title}</td>
                     <td>{p.start_date.toDateString()}</td>
                     <td>{p.end_date.toDateString()}</td>
                     <td>{p.price}</td>
                     <td>NA</td>
                     <td className="text-center">
                        <Link to="" className="text-white mx-1"><i className="fas fa-edit" data-id={p._id}></i></Link>
                        <Link to="" className="text-white mx-1"><i className="fas fa-trash" data-id={p._id}></i></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </>
   )
}

export default SecretaryScreen
