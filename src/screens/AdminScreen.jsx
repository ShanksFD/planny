import React, {useEffect} from 'react'
import {Container, Col, Row, Button, Form, FormControl} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';

// Local imports
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listUsers} from "../actions/userActions"

function AdminScreen({history}) {
   const { loading, error, userInfo } = useSelector(state => state.userLogin);

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(listUsers())
      if (! userInfo.is_admin) {
         history.push("/")
      }
   }, [history, userInfo, dispatch])

   return (
      <Container>
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


         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message> 
         ):
         (
            <>
            </>
         )}
      </Container>
   )
}

export default AdminScreen
