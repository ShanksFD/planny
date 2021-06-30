import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT_SUCCESS,
   USER_LOGOUT_FAILED
} from "../constants/userConstants";

import {auth} from "../firebase"

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      });
      
      const data = await auth.signInWithEmailAndPassword(email, password);

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAILED,
         payload: error.message,
      });
   }
};

export const logout = () => async (dispatch) => {
   try
   {
      await auth.signOut();

      localStorage.removeItem("userInfo");
      dispatch({
         type: USER_LOGOUT_SUCCESS
      })
   } catch(error) {
      dispatch({
         type: USER_LOGOUT_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
}

