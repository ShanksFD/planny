import React, {useEffect} from 'react'
import {Container, Table, Col, Row, Button, Form, FormControl} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';

// Local imports
import Loader from '../components/Loader';
import Message from '../components/Message';

function AdminScreen({history}) {
   const { userInfo } = useSelector(state => state.userLogin);

   useEffect(() => {
      if (! userInfo.is_admin) {
         history.push("/")
      }
   }, [history, userInfo])

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


         {/* {loading ? (
            <Loader />
         ) : error ? (
            <Message variant="danger">{error}</Message> 
         ):
         (
            <>
            </>
         )} */}
      </Container>
   )
}

export default AdminScreen
