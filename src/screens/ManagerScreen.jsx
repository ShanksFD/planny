import React, { useEffect } from 'react'
import {Col, Row, Table} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from "react-router"
import { Link } from 'react-router-dom'

// Local imports
import {listProjectsByManager} from "../actions/projectActions"

function ManagerScreen() {
   // init history 
   const history = useHistory()

   // init states
   const {userInfo} = useSelector(state =>  state.userLogin)
   const projectsManagerList = useSelector(state => state.projectsManagerList)

   const dispatch = useDispatch()

   useEffect(() => {
      // List projects
      dispatch(listProjectsByManager(userInfo.uid))
   }, [dispatch, userInfo.uid])


   return (
      <>
         <Row className="my-4">
            <Col>
               <h4>ADD PHASES</h4>
            </Col>
         </Row>

         <Table striped bordered hover responsive variant="dark" className="py-4">
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Price</th>
                  <th>Phases</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {projectsManagerList.projects.map((p) => (
                  <tr key={p._id}>
                     <td>{p.title}</td>
                     <td>{p.start_date.toDateString()}</td>
                     <td>{p.end_date.toDateString()}</td>
                     <td>{p.price}</td>
                     <td>
                        {p.phases.length === 0 ? "NO PHASES" : 
                           <Link to={`phases/${p._id}`} style={{color: "white"}}>
                              {p.phases.length} PHASES
                           </Link>
                        }
                        
                     </td>
                     <td style={{textAlign: "center"}}>
                        <Link to={`phase/${p._id}`} style={{color: "white"}}>
                           <i className="fa fa-plus-circle" ></i>
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </>
   )
}

export default ManagerScreen
