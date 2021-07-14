import React, { useState } from 'react'
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap"
import { useDispatch } from 'react-redux'
import {updatePhaseStatus} from "../../actions/projectActions"

function Phase({label, desc, employees, price, startDate, endDate, isDone, id}) {
   const dispatch = useDispatch()
   const [status, setStatus] = useState(isDone)
   
   return (
      <>
         <Card style={{ width: '20rem' }}>
            <Card.Body>
               <Card.Title>{label || ""}</Card.Title>
               <Card.Text>
                  {desc || ""}
               </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
               <ListGroupItem>Employees: <br/>{employees || ""}</ListGroupItem>
               <ListGroupItem>Price: <br/>${price || ""}</ListGroupItem>
               <ListGroupItem>
                  <p>Start date: {startDate || ""}</p>
                  <p>End date: {endDate || ""}</p>
               </ListGroupItem>
            </ListGroup>
            <Card.Body style={{color: status ? "green" : "orange", fontSize: "1.2rem", fontWeight: "400", textAlign: "center"}}>
               {status ? 
               <>
                  <i className="fa fa-check mx-1 my-3"></i>
                  DONE
               </>
               : 
               <>
                  <Button onClick={() => {
                     dispatch(updatePhaseStatus(id))
                     setStatus(!status)
                  }}
                  className="w-100">MARK AS DONE</Button>
               </>}
               
            </Card.Body>
         </Card>
      </>
   )
}

export default Phase
