import React from 'react'
import {useSelector} from 'react-redux'
import {Container} from 'react-bootstrap'

// Local Imports
import AdminScreen from "../../screens/AdminScreen"
import SecretaryScreen from "../../screens/SecretaryScreen"
import DirectorScreen from '../../screens/DirectorScreen'
import ManagerScreen from '../../screens/ManagerScreen'


function Dashboard() {
   const {userInfo} = useSelector(state => state.userLogin)

   return (
      <Container>
         {userInfo.is_admin ? <AdminScreen/>
         : userInfo.is_director ? <DirectorScreen/>
         : userInfo.is_projectManager ? <ManagerScreen/>
         : userInfo.is_accountingManager ? "Accounting Dashboard"
         : userInfo.is_secretary ? <SecretaryScreen/>
         : ""}
      </Container>
   )
}

export default Dashboard
