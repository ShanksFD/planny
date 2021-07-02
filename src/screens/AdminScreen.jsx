import React, {useEffect, useState} from 'react'
import { Col, Row, Button, Form, FormControl, Table} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

// Local imports
import Loader from '../components/Loader';
import Message from '../components/Message';
import EditForm from '../components/EditForm';
import {listUsers} from "../actions/userActions"
import {ADMINISTRATOR_PERM, SECRETARY_PERM, DIRECTOR_PERM, ACCOUNTING_MANGER_PERM, PROJECT_MANAGER_PERM} from '../utils'
import Popup from '../components/Popup';

function AdminScreen({history}) {
   // Modals states
   const [editModalShow, setEditModalShow] = useState(false);
   const [deleteModalShow, setDeleteModalShow] = useState(false);

   const { loading, error, userInfo } = useSelector(state => state.userLogin);
   const { users } = useSelector(state => state.usersList);

   const dispatch = useDispatch()



   useEffect(() => {
      if (! userInfo.is_admin) {
         history.push("/")
      }
      // List users
      dispatch(listUsers())
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Departement</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user.uid}>
                     <td>{user.first_name}</td>
                     <td>{user.last_name}</td>
                     <td>{user.email}</td>
                     <td>{( user.is_admin ? ADMINISTRATOR_PERM
                        : user.is_director ? DIRECTOR_PERM
                        : user.is_accountingManager ? ACCOUNTING_MANGER_PERM
                        : user.is_projectManager ? PROJECT_MANAGER_PERM
                        : user.is_secretary ? SECRETARY_PERM
                        : "Root")}</td>
                     <td className="text-center">
                        <Link to="" className="text-white mx-1" onClick={() => setEditModalShow(true)}><i className="fas fa-edit"></i></Link>
                        <Link to="" className="text-white mx-1" onClick={() => setDeleteModalShow(true)}><i className="fas fa-trash"></i></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      
         <Popup show={editModalShow} onHide={() => setEditModalShow(false)} title="Edit" 
            confirmation={true}
            confirmationTitle="EDIT" 
            buttonVariant="primary" 
            onConfirmation={() => {
               console.log("Edited")
               setEditModalShow(false)
            }}>
               <EditForm/>
         </Popup>

         <Popup show={deleteModalShow} onHide={() => setDeleteModalShow(false)} title="Confirmation" 
            confirmation={true}
            confirmationTitle="DELETE" 
            buttonVariant="danger" 
            onConfirmation={() => {
               console.log("Deleted")
               setDeleteModalShow(false)
            }}>

            </Popup>
         {/* Are you sure you want to delete this user? */}

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
