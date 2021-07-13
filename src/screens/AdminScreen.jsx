import React, {useEffect, useRef, useState} from 'react'
import { Col, Row, Button, Form, Table, InputGroup} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

// Local imports
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listUsers, getUserDetails, updateUserProfile, deleteUser} from "../actions/userActions"
import {ADMINISTRATOR_PERM, SECRETARY_PERM, DIRECTOR_PERM, ACCOUNTING_MANGER_PERM, PROJECT_MANAGER_PERM} from '../utils'
import Popup from '../components/Popup';

function AdminScreen() {
   // Modals states
   const [firstName, setFirstName] = useState ("");
   const [lastName, setLastName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [admin, setAdmin] = useState(true);
   const [director, setDirector] = useState(false);
   const [projectManager, setProjectManager] = useState(false);
   const [secretary, setSecretary] = useState(false);
   const [accountingManager, setAccountingManager] = useState(false);
   const [editModalShow, setEditModalShow] = useState(false);
   const [deleteModalShow, setDeleteModalShow] = useState(false);
   const [updateMessage, setUpdateMessage] = useState("")
   const [uid, setUID] = useState("")
   const dispatch = useDispatch()

   const { loading, error, userInfo } = useSelector(state => state.userLogin);
   const { users } = useSelector(state => state.usersList);

   const userUpdateProfle = useSelector((state) => state.userUpdateProfile);
   const userDetails = useSelector(state => state.userDetails)
   
   const deletedUser = useSelector(state => state.userDelete)

   // init history
   const history = useHistory();

   const editHandler = () => {
      dispatch(updateUserProfile(
         {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            is_accountingManager: accountingManager,
            is_admin: admin,
            is_director: director,
            is_projectManager: projectManager,
            is_secretary: secretary,
            uid: uid
         }
      ))
   }

   const initForms = (user) =>
   {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhoneNumber(user.phone_number);
      setUID(user.uid);
      setAdmin(user.is_admin)
      setDirector(user.is_director)
      setProjectManager(user.is_projectManager)
      setSecretary(user.is_secretary)
      setAccountingManager(user.is_accountingManager)
   }
   var isDeleted = useRef(false);;

   useEffect(() => {
      if (! userInfo.is_admin) {
         history.push("/")
      }
      
      // List users
      if(users.length === 0)
         dispatch(listUsers())


      // FIXME: setUpdateMessage("")
      if(userUpdateProfle.success)
      {
         setUpdateMessage("User has been edited successfully")
      }

      if(userDetails.success)
      {
         initForms(userDetails.user)
      }

      if(deletedUser && deletedUser.success && !isDeleted.current)
      {
         dispatch(listUsers())
         isDeleted.current = true
      }
      
   }, [
      userInfo, dispatch, 
      userDetails.success, 
      users.length, 
      userDetails.user,
      userUpdateProfle.success,
      deletedUser,
      history
   ])

      
   return (
      <>
          <Row >
            <Col  className="py-4">
               <div style={{float: "right"}} >
                  <Button onClick={() => history.push("/user")}>ADD USER</Button>
               </div>
            </Col>
         </Row>

         <Table striped bordered hover responsive variant="dark">
            <thead>
               <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Departement</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {users.map((u) => (
                  <tr key={u.uid}>
                     <td>{u.first_name}</td>
                     <td>{u.last_name}</td>
                     <td>{u.email}</td>
                     <td>{( u.is_admin ? ADMINISTRATOR_PERM
                        : u.is_director ? DIRECTOR_PERM
                        : u.is_accountingManager ? ACCOUNTING_MANGER_PERM
                        : u.is_projectManager ? PROJECT_MANAGER_PERM
                        : u.is_secretary ? SECRETARY_PERM
                        : "Root")}</td>
                     <td className="text-center">
                        <Link to="" className="text-white mx-1" onClick={(e) => {
                           dispatch(getUserDetails(e.target.getAttribute("data-id")))
                           setEditModalShow(true)
                        }}><i className="fas fa-edit" data-id={u.uid}></i></Link>
                        <Link to="" className="text-white mx-1" onClick={(e) => {
                           dispatch(getUserDetails(e.target.getAttribute("data-id")))
                           setDeleteModalShow(true)
                        }}><i className="fas fa-trash" data-id={u.uid}></i></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      
         {/* Edit Popup */}
         <Popup show={editModalShow} onHide={() => setEditModalShow(false)} title="Edit" 
            confirmation={true}
            confirmationTitle="EDIT" 
            buttonVariant="primary" 
            onConfirmation={editHandler}>
               {(userUpdateProfle.success && <Message variant="info">{updateMessage}</Message> ) ||
               (userUpdateProfle.error && <Message variant="danger">{userUpdateProfle.error}</Message>) }

               {userDetails.loading ? <Loader/> 
               : userDetails.error ? <Message variant="danger">{userDetails.error}</Message>
            : (
               <Form autoComplete="off">
                  <Row>
                     <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="firstName" className="my-3">
                           <Form.Label>FIRST NAME</Form.Label>
                           <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={ e => {
                              setFirstName(e.target.value);
                           }}/>
                        </Form.Group>
                     </Col>

                     <Col lg={6} md={6} sm={12}>
                        <Form.Group controlId="lastName" className="my-3">
                           <Form.Label>LAST NAME</Form.Label>
                           <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={ e => {
                              setLastName(e.target.value);
                           }}/>
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row>
                     <Form.Group controlId="phoneNumber" className="my-3">
                        <Form.Label>PHONE NUMBER</Form.Label>
                           <InputGroup className="mb-2 mr-sm-2">
                           <InputGroup.Prepend>
                              <InputGroup.Text>+212</InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control type="text" placeholder="Enter phone number" value={phoneNumber} onChange={ e => {
                              setPhoneNumber(e.target.value);
                           }}/>
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
                           label="Administrator"
                           name="userTypeRadios"
                           id="administrator"
                           checked={admin}
                           value={admin} onChange={ (e) => {
                              setAdmin(!admin);
                           }}
                        />
                        <Form.Check
                           type="radio"
                           label="Director"
                           name="userTypeRadios"
                           id="director"
                           checked={director}
                           value={director} onChange={ (e) => {
                              setDirector(!director);
                           }}
                        />
                        <Form.Check
                           type="radio"
                           label="Project Manager"
                           name="userTypeRadios"
                           id="projectManager"
                           checked={projectManager}
                           value={projectManager} onChange={ (e) => {
                              setProjectManager(!projectManager);
                           }}
                        />
                        <Form.Check
                           type="radio"
                           label="Secretary"
                           name="userTypeRadios"
                           id="secretary"
                           checked={secretary}
                           value={secretary} onChange={ (e) => {
                              setSecretary(!secretary);
                           }}
                        />
                        <Form.Check
                           type="radio"
                           label="Accounting Manager"
                           name="userTypeRadios"
                           id="accountingManager"
                           checked={accountingManager}
                           value={accountingManager} onChange={ (e) => {
                              setAccountingManager(!accountingManager);
                           }}
                        />
                        </Col>
                     </Form.Group>
                  </Row>
               </Form>
            )}
         </Popup>

         {/* Delete Popup */}
         <Popup show={deleteModalShow} onHide={() => setDeleteModalShow(false)} title="Confirmation" 
            confirmation={true}
            confirmationTitle="DELETE" 
            buttonVariant="danger" 
            onConfirmation={() => {
               dispatch(deleteUser(uid))

               setDeleteModalShow(false)
            }}>
               <p>Are you sure you want to delete this user?</p>
            </Popup>
         

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
