import React from 'react'
import { useSelector } from 'react-redux';

// Local Imports
import LoginScreen from './LoginScreen'
import AdminScreen from './AdminScreen';

function HomeScreen() {

   const { userInfo } = useSelector(state => state.userLogin);
   return (
      <div>
         {!userInfo && <LoginScreen/>}
         {
            userInfo && <AdminScreen/>
         }
      </div>
   )
}

export default HomeScreen
