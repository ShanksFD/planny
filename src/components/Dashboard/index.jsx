import React from 'react'
import {useSelector} from 'react-redux'

// Local Imports
import {ADMINISTRATOR_PERM, SECRETARY_PERM, DIRECTOR_PERM, ACCOUNTING_MANGER_PERM, PROJECT_MANAGER_PERM} from '../../utils'
import HomeScreen from "../../screens/HomeScreen"
import AdminScreen from "../../screens/AdminScreen"
function Dashboard() {

   const {userInfo} = useSelector(state => state.userLogin)
   return (
      <>
         {userInfo.is_admin ? <AdminScreen/> 
         : userInfo.is_director ? "Director Dashboard"
         : userInfo.is_projectManager ? "Project Manager Dashboard"
         : userInfo.is_accountingManager ? "Accounting Dashboard"
         : userInfo.is_secretary ? "Secretary Dashboard"
         : ""}
      </>
   )
}

export default Dashboard
