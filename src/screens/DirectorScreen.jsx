import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Col, Row, Button, Form, FormControl, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Local imports
import {getProjectDetails, listProjects, deleteProject} from "../actions/projectActions"
import Popup from '../components/Popup';
import {updateProject} from "../actions/projectActions"
import Message from '../components/Message';
import Loader from '../components/Loader';
import {PROJECT_UPDATE_PROFILE_RESET} from "../constants/projectConstants"
import {getProjectManagerList} from "../actions/userActions"


function DirectorScreen() {
      // States
   const [editModalShow, setEditModalShow] = useState(false);
   const [deleteModalShow, setDeleteModalShow] = useState(false);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("")
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [price, setPrice]= useState("")
   const [clientFName, setClientFName] = useState("")
   const [clientLName, setClientLName] = useState("")
   const [projectId, setProjectId] = useState()
   const [clientId, setClientId] = useState()
   const [updateMessage, setUpdateMessage] = useState("")


   const { projects } = useSelector(state => state.projectsList)

   // UseRef to prevent upcoming renders
   const { clients } = useSelector(state => state.projectsList)
   const clientsRef = useRef(null)
   clientsRef.current = clients

   // UseRef to prevent upcoming renders
   const managersList = useSelector(state => state.projectManagerList)
   const managersListRef = useRef(null)
   managersListRef.current = managersList.users

   const projectDetails = useSelector(state => state.projectDetails)
   const projectUpdate = useSelector(state => state.projectUpdate)

   const getProjectManagerName = (id) => {
      var name = "N/A"
      for(let i = 0; i < managersListRef.current.length; i++)
      {
         if(managersListRef.current[i].uid === id)
         {
            name = managersListRef.current[i].first_name + " " + managersListRef.current[i].last_name
            break;
         }
      }
      return name
   };

   const getClientName = useCallback((id) =>
   {
      var name = "N/A"
      for(let i = 0; i < clientsRef.current.length; i++)
      {
         if(clientsRef.current[i]._id === id)
         {
            name = {
               first_name: clientsRef.current[i].first_name,
               last_name:  clientsRef.current[i].last_name,
               full_name: clientsRef.current[i].first_name + " " + clientsRef.current[i].last_name
            };
            break;
         }
      }
      return name
   }, []);

   const initForms = useCallback( (project) =>
   {
      setTitle(project.title);
      setDescription(project.description);
      setStartDate(project.start_date)
      setEndDate(project.end_date)
      setPrice(project.price)
      setClientFName(getClientName(project.client_id).first_name)
      setClientLName(getClientName(project.client_id).last_name)

      setProjectId(project._id)
      setClientId(project.client_id)
   }, [getClientName]);

   const dispatch = useDispatch()

   const editHandler = () => {
      dispatch(updateProject(
         {
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            price: price,
            _id: projectId
         },
         {
            first_name: clientFName,
            last_name: clientLName,
            _id: clientId
         }
      ))
   }
   useEffect(() => {
      // List projects
      dispatch(listProjects())
      dispatch(getProjectManagerList())
   }, [dispatch])


   const isDetailsDeployed = useRef(false)
   useEffect(() => {
      if(projectDetails.success && !isDetailsDeployed.current)
      {
         initForms(projectDetails.project)
         isDetailsDeployed.current = true
      }

      if(projectUpdate.success)
      {
         setUpdateMessage("Project has been edited successfully")
      }
      else
      {
         setUpdateMessage("")
      }

   }, [dispatch, projects.length, projectDetails.success, projectDetails.project, projectDetails.project.client_id, initForms, projectUpdate.success])

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
                  <th>Manager</th>
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
                     <td>{getClientName(p.client_id).full_name}</td>
                     <td>{getProjectManagerName(p.manager_id)}</td>
                     <td className="text-center">
                        <Link to="" className="text-white mx-1"><i className="fas fa-edit" onClick={(e) => {
                           dispatch(getProjectDetails(e.target.getAttribute("data-id")))
                           setEditModalShow(true)
                        }} data-id={p._id}></i></Link>
                        <Link to="" className="text-white mx-1" onClick={e => {
                           dispatch(getProjectDetails(e.target.getAttribute("data-id")))
                           setDeleteModalShow(true)
                        }}><i className="fas fa-trash" data-id={p._id}></i></Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>

         {/* Edit Popup */}
         <Popup show={editModalShow} onHide={() => {
            setEditModalShow(false)
            dispatch({type: PROJECT_UPDATE_PROFILE_RESET})
            dispatch(listProjects())
         }} title="Edit" 
            confirmation={true}
            confirmationTitle="EDIT" 
            buttonVariant="primary" 
            onConfirmation={editHandler}>
               {
               (projectUpdate.loading && <Loader /> ) ||
               (projectUpdate.success && <Message variant="info">{updateMessage}</Message> ) ||
               (projectUpdate.error && <Message variant="danger">{projectUpdate.error}</Message>) }

               {projectDetails.loading ? <Loader/> 
               : projectDetails.error ? <Message variant="danger">{projectDetails.error}</Message>
            : (
            <Form autoComplete="off">
               <h4  className="my-3">CLIENT<hr/></h4>
               <Row>
                  <Col lg={6} md={6} sm={12}>
                     <Form.Group controlId="client_fname" className="my-3">
                        <Form.Label>FIRST NAME</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={clientFName} onChange={ e => {
                           setClientFName(e.target.value);
                        }}/>
                     </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                     <Form.Group controlId="client" className="my-3">
                        <Form.Label>LAST NAME</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={clientLName} onChange={ e => {
                           setClientLName(e.target.value);
                        }}/>
                     </Form.Group>
                  </Col>
               </Row>
               
               <h4  className="my-3">PROJECT<hr/></h4>
               <Row>
                  <Form.Group controlId="title" className="my-3">
                     <Form.Label>TITLE</Form.Label>
                     <Form.Control type="text" placeholder="Enter title" value={title} onChange={ e => {
                        setTitle(e.target.value);
                     }}/>
                  </Form.Group>
               </Row>

               <Row>
                  <Form.Group controlId="description" className="my-3">
                     <Form.Label>DESCRIPTION</Form.Label>
                     <Form.Control as="textarea" rows={3} placeholder="Project description" value={description} 
                        onChange={((e) => {
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
                     <Form.Control type="text" placeholder="Enter price" value={price} onChange={ e => {
                        setPrice(e.target.value);
                     }}/>
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
               dispatch(deleteProject(projectId, clientId))
               setDeleteModalShow(false)
            }}>
               <p>Are you sure you want to delete this user?</p>
         </Popup>
      </>
   )
    
}

export default DirectorScreen
