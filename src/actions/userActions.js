import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   
   USER_LOGOUT_SUCCESS,
   USER_LOGOUT_FAILED,

   USER_DETAILS_FAILED,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,

   USER_REGISTER_FAILED,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

import firebase, {auth} from "../firebase"

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

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST,
      });

      const {
         userLogin: {userInfo},
      } = getState()

      const data = userInfo;
      // const config = {
      //    headers: {
      //       "Content-type": "application/json",
      //       Authorization: `Bearer ${userInfo.token}`
      //    },
      // };
      // const { data } = await axios.get(
      //    `/api/users/${id}`,
      //    config
      // );

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: data,
      });

   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const register = (first_name, last_name, email, password, phone_number, 
                           is_accountingManager, is_admin, is_projecManager, is_secretary) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST,
      });

      const authData = await auth.createUserWithEmailAndPassword(email, password);
      
      var user = {
         first_name: first_name,
         last_name: last_name,
         phone_number: phone_number,
         is_accountingManager: is_accountingManager,
         is_admin: is_admin,
         is_projecManager: is_projecManager,
         is_secretary: is_secretary,
         uid: authData.user.uid,
         email: authData.user.email
      }
      
      
      const docRef = await firebase.collection("users").add(user);
      const doc = await docRef.get();
      const data = doc.data();
      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data,
      });

      
      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};