import {
   PROJECT_LIST_FAILED,
   PROJECT_LIST_REQUEST,
   PROJECT_LIST_SUCCESS,
   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS
} from "../constants/projectConstants";
import firebase, {timeStamp} from "../firebase"
import { v4 as uuidv4 } from 'uuid';

export const registerProject = ({title, description, start_date, end_date, price, client_id}) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_REGISTER_REQUEST,
      });

      const id = uuidv4();

      var project = {
         title: title,
         description: description,
         start_date: timeStamp.fromDate(new Date(start_date)),
         end_date: timeStamp.fromDate(new Date(end_date)),
         price: price,
         client_id: client_id,
         _id: id
      }
      
      // Add project 
      await firebase.collection("projects").doc(id).set(project);

      dispatch({
         type: PROJECT_REGISTER_SUCCESS,
         success: true
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

export const listProjects = () => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_LIST_REQUEST,
      });

      const snapshot = await firebase.collection("projects").get()
      const data = snapshot.docs.map(doc => doc.data());
      
      data.forEach((p) => {
         const startSeconds = p.start_date.seconds;
         p.start_date = new Date(1970, 0, 1)
         p.start_date.setSeconds(startSeconds);

         const endSeconds = p.end_date.seconds;
         p.end_date = new Date(1970, 0, 1)
         p.end_date.setSeconds(endSeconds);
      })

      dispatch({
         type: PROJECT_LIST_SUCCESS,
         payload: data,
      });
      

   } catch (error) {
      dispatch({
         type: PROJECT_LIST_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};