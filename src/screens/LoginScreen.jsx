import React, { useState} from 'react'
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import FormContainer from '../components/formContainer';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

function LoginScreen() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   // destruct userinfo from current state 
   const {error, loading } = useSelector(state => state.userLogin);
   const dispatch = useDispatch();

   const submitHandler = (e) => {
      // Prevent refreshing the page
      e.preventDefault()

      // Call login action
      dispatch(login(email, password))
   }
   return (
      <FormContainer>
         {error && <Message variant="danger">{error}</Message>}
         {loading && <Loader />}
         <h1 className="font--light text-center">Sign in</h1>
         <Form onSubmit={submitHandler}>

            <Form.Group controlId="email" className="my-4">
               <Form.Label>EMAIL</Form.Label>
               <Form.Control type="email" placeholder="Enter email" required  value={email} onChange={e => 
               {
                  setEmail(e.target.value)
               }}></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-4" >
               <Form.Label>PASSWORD</Form.Label>
               <Form.Control type="password" placeholder="Enter Password" required value={password} onChange={e => 
               {
                  setPassword(e.target.value)
               }}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="">Sign In</Button>
         </Form>
      </FormContainer>
   )
}

export default LoginScreen
