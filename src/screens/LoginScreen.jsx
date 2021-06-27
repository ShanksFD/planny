import React from 'react'
import { Form, Button } from "react-bootstrap";

// Local Imports
import FormContainer from '../components/formContainer';

function LoginScreen() {
   const submitHandler = () => 
   {
      console.log("Handling")
   }

   return (
      <FormContainer>
         <h1 className="font--light text-center">Sign in</h1>
         <Form onSubmit={submitHandler}>

            <Form.Group controlId="email" className="my-4">
               <Form.Label>USERNAME</Form.Label>
               <Form.Control type="email" placeholder="Enter username/email"></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-4" >
               <Form.Label>PASSWORD</Form.Label>
               <Form.Control type="password" placeholder="Enter Password"></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="">Sign In</Button>
         </Form>
      </FormContainer>
   )
}

export default LoginScreen
