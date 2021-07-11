import { 
   CLIENT_REGISTER_FAILED,
   CLIENT_REGISTER_REQUEST,
   CLIENT_REGISTER_SUCCESS,
} from "../constants/clientConstants";
import firebase from "../firebase"
import { v4 as uuidv4 } from 'uuid';

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