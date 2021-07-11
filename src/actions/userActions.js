import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   
   USER_LOGOUT_SUCCESS,
   USER_LOGOUT_FAILED,

   USER_LIST_FAILED,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,

   USER_REGISTER_FAILED,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,

   CLIENT_REGISTER_FAILED,
   CLIENT_REGISTER_REQUEST,
   CLIENT_REGISTER_SUCCESS,

   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS,

   USER_DETAILS_FAILED,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,

   USER_UPDATE_PROFILE_FAILED,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,

   USER_DELETE_REQUEST,
   USER_DELETE_FAILED,
   USER_DELETE_SUCCESS
} from "../constants/userConstants";
import { v4 as uuidv4 } from 'uuid';
import firebase, {auth, timeStamp} from "../firebase"

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      });
      
      // Login user
      const authData = await auth.signInWithEmailAndPassword(email, password);

      // grab and assign added user
      const docRef = firebase.collection("users").doc(authData.user.uid)
      const doc = await docRef.get();
      const data = doc.data();

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

export const listUsers = () => async (dispatch) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST,
      });

      const snapshot = await firebase.collection("users").get()
      const data = snapshot.docs.map(doc => doc.data());
      
      dispatch({
         type: USER_LIST_SUCCESS,
         payload: data,
      });

   } catch (error) {
      dispatch({
         type: USER_LIST_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const register = (first_name, last_name, email, password, phone_number, 
                        admin, director, projectManager, accountingManager, secretary) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST,
      });

      const authData = await auth.createUserWithEmailAndPassword(email, password);
      
      var user = {
         uid: authData.user.uid,
         first_name: first_name,
         last_name: last_name,
         phone_number: phone_number,
         is_admin: admin,
         is_director: director,
         is_accountingManager: accountingManager,
         is_projectManager: projectManager,
         is_secretary: secretary,
         email: authData.user.email
      }
      
      // Add user details
      await firebase.collection("users").doc(authData.user.uid).set(user);
      
      // grab and assign added user
      const docRef = firebase.collection("users").doc(authData.user.uid)
      const doc = await docRef.get();
      const data = doc.data();

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data,
      });
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

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST,
      });

      // grab and assign added user
      const docRef = await firebase.collection("users").doc(id)
      const doc = await docRef.get();
      const data = doc.data();

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: data,
      });

   } catch (error) {
      dispatch({
         type: USER_DETAILS_FAILED,
         payload: error.message,
      });
   }
};

export const updateUserProfile = (user) => async (dispatch) => {
   try {
      dispatch({
         type: USER_UPDATE_PROFILE_REQUEST,
      });
      
      await firebase.collection("users").doc(user.uid).update(user);

      dispatch({
         type: USER_UPDATE_PROFILE_SUCCESS,
      });

   } catch (error) {
      dispatch({
         type: USER_UPDATE_PROFILE_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const deleteUser = (id) => async (dispatch) => {
   try
   {
      dispatch({
         type: USER_DELETE_REQUEST,
         loading: true
      })

      await firebase.collection("users").doc(id).delete()

      dispatch({
         type: USER_DELETE_SUCCESS,
         success: true
      })
   } catch(error) {
      dispatch({
         type: USER_DELETE_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
}

export const registerClient = ({first_name, last_name, email, phone_number, website}) => async (dispatch) => {
   try {
      dispatch({
         type: CLIENT_REGISTER_REQUEST,
      });

      const id = uuidv4();

      var user = {
         first_name: first_name,
         last_name: last_name,
         phone_number: phone_number,
         email: email,
         website: website,
         _id: id
      }
      
      // Add client 
      await firebase.collection("clients").doc(id).set(user);

      dispatch({
         type: CLIENT_REGISTER_SUCCESS,
         payload: id
      });
   } catch (error) {
      dispatch({
         type: CLIENT_REGISTER_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const registerProject = ({title, description, start_date, end_date, price, client_id}) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_REGISTER_REQUEST,
      });

      const id = uuidv4();

      console.log()
      var project = {
         title: title,
         description: description,
         start_date: timeStamp.fromDate(new Date(start_date)),
         end_date: timeStamp.fromDate(new Date(end_date)),
         price: price,
         client_id: client_id
      }
      
      // Add project 
      await firebase.collection("projects").doc(id).set(project);

      dispatch({
         type: PROJECT_REGISTER_SUCCESS,
      });
   } catch (error) {
      dispatch({
         type: PROJECT_REGISTER_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};