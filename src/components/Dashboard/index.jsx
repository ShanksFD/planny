import React from 'react'
import {useSelector} from 'react-redux'
import {Container} from 'react-bootstrap'

// Local Imports
import AdminScreen from "../../screens/AdminScreen"


function Dashboard() {
   const {userInfo} = useSelector(state => state.userLogin)
   return (
      <Container>
         {userInfo.is_admin ? <AdminScreen/>
         : userInfo.is_director ? "Director Dashboard"
         : userInfo.is_projectManager ? "Project Manager Dashboard"
         : userInfo.is_accountingManager ? "Accounting Dashboard"
         : userInfo.is_secretary ? "Secretary Dashboard"
         : ""}
      </Container>
   )
}

export default Dashboard
