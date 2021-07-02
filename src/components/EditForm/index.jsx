import React, {useState} from 'react'
import { Form, InputGroup, Col, Row} from 'react-bootstrap'

function EditForm() {
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [password, setPassword] = useState("");
   const [admin, setAdmin] = useState(false);
   const [director, setDirector] = useState(false);
   const [projectManager, setProjectManager] = useState(false);
   const [secretary, setSecretary] = useState(false);
   const [accountingManager, setAccountingManager] = useState(false);

   const submitHandler = (e) => {
      e.preventDefault();
      console.log("Edited");
   }

   return (
      <>
         <Form onSubmit={submitHandler}>
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
                  <Form.Group controlId="email" className="my-3">
                     <Form.Label>EMAIL ADDRESS</Form.Label>
                     <Form.Control type="email" placeholder="Enter email" value={email} onChange={ e => {
                           setEmail(e.target.value);
                        }}/>
                  </Form.Group>
               </Row>
               
               <Row>
                  <Form.Group controlId="password" className="my-3">
                     <Form.Label>PASSWORD</Form.Label>
                     <Form.Control type="password" placeholder="Enter password" value={password} onChange={ e => {
                           setPassword(e.target.value);
                        }}/>
                  </Form.Group>
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

                        value={admin} onChange={ () => {
                           setAdmin(!admin);
                        }}
                     />
                     <Form.Check
                        type="radio"
                        label="Director"
                        name="userTypeRadios"
                        id="director"

                        value={director} onChange={ () => {
                           setDirector(!director);
                        }}
                     />
                     <Form.Check
                        type="radio"
                        label="Project Manager"
                        name="userTypeRadios"
                        id="projectManager"

                        value={projectManager} onChange={ () => {
                           setProjectManager(!projectManager);
                        }}
                     />
                     <Form.Check
                        type="radio"
                        label="Secretary"
                        name="userTypeRadios"
                        id="secretary"

                        value={secretary} onChange={ () => {
                           setSecretary(!secretary);
                        }}
                     />
                     <Form.Check
                        type="radio"
                        label="Accounting Manager"
                        name="userTypeRadios"
                        id="accountingManager"

                        value={accountingManager} onChange={ () => {
                           setAccountingManager(!accountingManager);
                        }}
                     />
                     </Col>
                  </Form.Group>
               </Row>
            </Form>
      </>
   )
}

export default EditForm
