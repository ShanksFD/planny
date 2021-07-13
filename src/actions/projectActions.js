import {
   PROJECT_LIST_FAILED,
   PROJECT_LIST_REQUEST,
   PROJECT_LIST_SUCCESS,

   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS,

   PROJECT_UPDATE_PROFILE_REQUEST,
   PROJECT_UPDATE_PROFILE_FAILED,
   PROJECT_UPDATE_PROFILE_SUCCESS,

   PROJECT_DETAILS_REQUEST,
   PROJECT_DETAILS_FAILED,
   PROJECT_DETAILS_SUCCESS,
   PROJECT_DELETE_REQUEST,
   PROJECT_DELETE_SUCCESS,
   PROJECT_DELETE_FAILED
} from "../constants/projectConstants";
import firebase, {timeStamp} from "../firebase"
import { v4 as uuidv4 } from 'uuid';

export const registerProject = ({title, description, start_date, end_date, price, client_id, manager_id}) => async (dispatch) => {
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
         _id: id,
         manager_id: manager_id
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
      const projects = snapshot.docs.map(doc => doc.data());
      
      projects.forEach((p) => {
         const startSeconds = p.start_date.seconds;
         p.start_date = new Date(1970, 0, 1)
         p.start_date.setSeconds(startSeconds);

         const endSeconds = p.end_date.seconds;
         p.end_date = new Date(1970, 0, 1)
         p.end_date.setSeconds(endSeconds);
      })

      var clients = await Promise.all(projects.map(async (p) => {
         const docRef = await firebase.collection("clients").doc(p.client_id)
         const doc = await docRef.get();
         
         return doc.data()       
      }))
         
      dispatch({
         type: PROJECT_LIST_SUCCESS,
         payload: projects,
         clients: clients
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

export const updateProject = (project, client) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_UPDATE_PROFILE_REQUEST,
      });
      project.start_date = timeStamp.fromDate(new Date(project.start_date))
      project.end_date = timeStamp.fromDate(new Date(project.end_date))

      await firebase.collection("projects").doc(project._id).update(project);
      await firebase.collection("clients").doc(client._id).update(client);
      
      dispatch({
         type: PROJECT_UPDATE_PROFILE_SUCCESS
      });

   } catch (error) {
      dispatch({
         type: PROJECT_UPDATE_PROFILE_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const getProjectDetails = (id) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_DETAILS_REQUEST,
      });

      const docRef = await firebase.collection("projects").doc(id)
      const doc = await docRef.get();
      const data = doc.data();

      

      // converting seconds to a date
      const startSeconds = data.start_date.seconds;
      data.start_date = new Date(1970, 0, 1)
      data.start_date.setSeconds(startSeconds);

      // In order to apply this datatype to HTML date control we need to convert our date format
      // to something like this 09-08-2021

      var day = ("0" + data.start_date.getDate()).slice(-2);
      var month = ("0" + (data.start_date.getMonth() + 1)).slice(-2);
      
      data.start_date = data.start_date.getFullYear() + "-" + month + "-" + day;

      const endSeconds = data.end_date.seconds;
      data.end_date = new Date(1970, 0, 1)
      data.end_date.setSeconds(endSeconds);

      day = ("0" + data.end_date.getDate()).slice(-2);
      month = ("0" + (data.end_date.getMonth() + 1)).slice(-2);

      data.end_date = data.end_date.getFullYear() + "-" + month + "-" + day;

      dispatch({
         type: PROJECT_DETAILS_SUCCESS,
         payload: data,
      });
      
   } catch (error) {
      dispatch({
         type: PROJECT_DETAILS_FAILED,
         payload: error.message,
      });
   }
};

export const deleteProject = (projectId, clientId) => async (dispatch) => {
   try
   {
      dispatch({
         type: PROJECT_DELETE_REQUEST,
         loading: true
      })

      await firebase.collection("projects").doc(projectId).delete()
      await firebase.collection("clients").doc(clientId).delete()

      dispatch({
         type: PROJECT_DELETE_SUCCESS,
         success: true
      })
      dispatch(listProjects())
   } catch(error) {
      dispatch({
         type: PROJECT_DELETE_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
}