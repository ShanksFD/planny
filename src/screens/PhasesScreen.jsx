import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails } from '../actions/projectActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

// Local imports
import Phase from "../components/Phase"

function PhasesScreen({match}) {
   const dispatch = useDispatch()
   const {project, success, loading, error} = useSelector(state => state.projectDetails)

   useEffect(() => {
      dispatch(getProjectDetails(match.params.id))
   }, [dispatch, match.params.id]);
   return (
      <Container>
         <h2>Project: {project.title || ""}</h2>
         <hr/>
         <Row className="py-4">
            {loading ? <Loader/>
            : error ? <Message variant="danger">{error.message}</Message>
            :
            success && project.phasesObjs.map((p) => (
               <Col className="py-4 col-md-4 col-lg-3 m-2" key={p._id}>
                  <Phase label={p.label} 
                     desc={p.description} 
                     employees={p.employees} 
                     price={p.price}
                     startDate={p.start_date}
                     endDate={p.end_date}
                     isDone={p.is_done}
                     id={p._id}/>
               </Col>
            ))}   
         </Row>
      </Container>
   )
}

export default PhasesScreen
