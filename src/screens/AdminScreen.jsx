import React, {useEffect, useState} from 'react'
import { Col, Row, Button, Form, FormControl, Table} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';

// Local imports
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listUsers} from "../actions/userActions"
import {ADMINISTRATOR_PERM, SECRETARY_PERM, DIRECTOR_PERM, ACCOUNTING_MANGER_PERM, PROJECT_MANAGER_PERM} from '../utils'

function AdminScreen({history}) {
   const [counter, setCounter] = useState(0);

   const incrementCounter = () => {setCounter(counter + 1)}
   // const decrementCounter = () => {setCounter(counter - 1)}

   const { loading, error, userInfo } = useSelector(state => state.userLogin);
   const { users } = useSelector(state => state.usersList);

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(listUsers())
      if (! userInfo.is_admin) {
         history.push("/")
      }
   }, [history, userInfo, dispatch])

   
   return (
      <>
          <Row>
            <Col lg={10}>
               <h4>Select user to change</h4>
            </Col>
            <Col>
               <LinkContainer to="/user">
                  <Button>ADD USER</Button>
               </LinkContainer>
            </Col>
         </Row>


         <Form>
            <Row>
               <Col>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
               </Col>
               <Col>
                  <Button>Search</Button>
               </Col>
            </Row>
         </Form>

         <Table striped bordered hover variant="dark" className="mt-5">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Email Address</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Departement</th>
                  <th>Operation</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user.uid}>
                     <td>{counter}</td>
                     <td>{user.first_name}</td>
                     <td>{user.last_name}</td>
                     <td>{( user.is_admin ? ADMINISTRATOR_PERM
                        : user.is_director ? DIRECTOR_PERM
                        : user.is_accountingManager ? ACCOUNTING_MANGER_PERM
                        : user.is_projectManager ? PROJECT_MANAGER_PERM
                        : user.is_secretary ? SECRETARY_PERM
                        : "Root")}</td>
                     <td>
                        <LinkContainer to="/">Edit</LinkContainer>
                        <LinkContainer to="/">Delete</LinkContainer>
                     </td>
                     {/* Increment list count by 1 */}
                     {incrementCounter()}
                  </tr>
               ))}
            </tbody>
         </Table>

         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message> 
         ):
         (
            <>
            </>
         )}
      </>
   )
}

export default AdminScreen
