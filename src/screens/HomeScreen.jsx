import React from 'react'
import { useSelector } from 'react-redux'

// Local Imports
import LoginScreen from './LoginScreen'
import Dashboard from '../components/Dashboard'

function HomeScreen() {

   const {userInfo} = useSelector(state => state.userLogin)
   return (
      <div>
         {userInfo ? <Dashboard /> : <LoginScreen/>}
         

      </div>
   )
}

export default HomeScreen
