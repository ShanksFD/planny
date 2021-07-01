import React from 'react'
import { useSelector } from 'react-redux';

// Local Imports
import LoginScreen from './LoginScreen'
import AdminScreen from './AdminScreen';
import { isLogin } from '../utils'

function HomeScreen() {

   const { userInfo } = useSelector(state => state.userLogin);
   return (
      <div>
      </div>
   )
}

export default HomeScreen
