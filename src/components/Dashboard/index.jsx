import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Container, Button} from 'react-bootstrap'

// Local Imports
import AdminScreen from "../../screens/AdminScreen"
import Popup from '../Popup';

function Dashboard() {
   const [modalShow, setModalShow] = useState(false);

   const {userInfo} = useSelector(state => state.userLogin)
   return (
      <Container>
         {false && <AdminScreen/> }
         {userInfo.is_admin ? "Admin Dashboard"
         : userInfo.is_director ? "Director Dashboard"
         : userInfo.is_projectManager ? "Project Manager Dashboard"
         : userInfo.is_accountingManager ? "Accounting Dashboard"
         : userInfo.is_secretary ? "Secretary Dashboard"
         : ""}

         <Button variant="primary" onClick={() => setModalShow(true)}>
            EDIT
         </Button>

         <Popup show={modalShow} onHide={() => setModalShow(false)} title="Modal Title">
            <p>
               Test modal
            </p>
         </Popup>
      </Container>
   )
}

export default Dashboard
