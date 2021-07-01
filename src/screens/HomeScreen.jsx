import React from 'react'

// Local Imports
import LoginScreen from './LoginScreen'
import { isLogin, currentPerm } from '../utils'
import Dashboard from '../components/Dashboard'

function HomeScreen() {

   return (
      <div>
         {!isLogin() && <LoginScreen />}

         <Dashboard perm={currentPerm}/>
      </div>
   )
}

export default HomeScreen
