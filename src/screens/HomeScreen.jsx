import React from 'react'
import { useSelector } from 'react-redux';

// Local Imports
import LoginScreen from './LoginScreen'

function HomeScreen() {

   const { userInfo } = useSelector(state => state.userLogin);
   return (
      <div>
         {!userInfo && <LoginScreen/>}
      </div>
   )
}

export default HomeScreen
