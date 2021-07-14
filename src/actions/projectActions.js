import {
   PROJECT_LIST_FAILED,
   PROJECT_LIST_REQUEST,
   PROJECT_LIST_SUCCESS,

   MANAGER_PROJECT_LIST_FAILED,
   MANAGER_PROJECT_LIST_REQUEST,
   MANAGER_PROJECT_LIST_SUCCESS,

   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS,

   PROJECT_UPDATE_PROFILE_REQUEST,
   PROJECT_UPDATE_PROFILE_FAILED,
   PROJECT_UPDATE_PROFILE_SUCCESS,

   PROJECT_UPDATE_PHASES_REQUEST,
   PROJECT_UPDATE_PHASES_FAILED,
   PROJECT_UPDATE_PHASES_SUCCESS,

   PROJECT_DETAILS_REQUEST,
   PROJECT_DETAILS_FAILED,
   PROJECT_DETAILS_SUCCESS,

   PROJECT_DELETE_REQUEST,
   PROJECT_DELETE_SUCCESS,
   PROJECT_DELETE_FAILED,

   PHASE_UPDATE_STATUS_REQUEST,
   PHASE_UPDATE_STATUS_FAILED,
   PHASE_UPDATE_STATUS_SUCCESS
} from "../constants/projectConstants";
import firebase, {timeStamp, storage} from "../firebase"
import { v4 as uuidv4 } from 'uuid';

export const registerProject = ({title, description, start_date, end_date, price, client_id, manager_id, files}) => async (dispatch) => {
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
         manager_id: manager_id,
         phases: []
      }

      const storageRef = storage.ref()
      for(let i = 0; i < files.length ; i++)
      {
         console.log(files[i].name)
         const fileRef = storageRef.child(`project_${id}/${files[i].name}.txt`)
         await fileRef.put(files[i])  
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

export const updateProjectPhase = (phase, projectId, projectPhases) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_UPDATE_PHASES_REQUEST,
      });
      phase.start_date = timeStamp.fromDate(new Date(phase.start_date))
      phase.end_date = timeStamp.fromDate(new Date(phase.end_date))

      const id = uuidv4();
      phase._id = id;
      phase.project_id = projectId;

      // Apply new added phase
      projectPhases.push(id)
      await firebase.collection("projects").doc(projectId).update({
         phases: projectPhases
      });

      // Add phase 
      await firebase.collection("phase").doc(id).set(phase);

      dispatch({
         type: PROJECT_UPDATE_PHASES_SUCCESS
      });

   } catch (error) {
      dispatch({
         type: PROJECT_UPDATE_PHASES_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

function formattedDate(startSeconds, endSeconds)
{
   // converting seconds to a date
   var start_date = new Date(1970, 0, 1)
   start_date.setSeconds(startSeconds);

   // In order to apply this datatype to HTML date control we need to convert our date format
   // to something like this 09-08-2021

   var day = ("0" + start_date.getDate()).slice(-2);
   var month = ("0" + (start_date.getMonth() + 1)).slice(-2);
   
   start_date = start_date.getFullYear() + "-" + month + "-" + day;

   var end_date = new Date(1970, 0, 1)
   end_date.setSeconds(endSeconds);

   day = ("0" + end_date.getDate()).slice(-2);
   month = ("0" + (end_date.getMonth() + 1)).slice(-2);

   end_date = end_date.getFullYear() + "-" + month + "-" + day;

   return {
      startDate: start_date,
      endDate: end_date
   }
}
export const getProjectDetails = (id) => async (dispatch) => {
   try {
      dispatch({
         type: PROJECT_DETAILS_REQUEST,
      });

      const docRef = await firebase.collection("projects").doc(id)
      const doc = await docRef.get();
      const data = doc.data();

      

      // converting seconds to a date
      const {startDate, endDate} = formattedDate(data.start_date.seconds, data.end_date.seconds)
      data.start_date = startDate;
      data.end_date = endDate;


      // Get phases list for each project
      data.phasesObjs = await Promise.all(data.phases.map(async (p) => {
         const docRef = await firebase.collection("phase").doc(p)
         const doc = await docRef.get();

         var data = doc.data()
         // converting seconds to a date
         const {startDate, endDate} = formattedDate(data.start_date.seconds, data.end_date.seconds)
         data.start_date = startDate;
         data.end_date = endDate;

         return data  
      }))


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

export const listProjectsByManager = (manager_id) => async (dispatch) => {
   try {
      dispatch({
         type: MANAGER_PROJECT_LIST_REQUEST,
      });

      const snapshot = await firebase.collection("projects").where("manager_id", "==", manager_id).get()
      const projects = snapshot.docs.map(doc => doc.data());

      projects.forEach((p) => {
         const startSeconds = p.start_date.seconds;
         p.start_date = new Date(1970, 0, 1)
         p.start_date.setSeconds(startSeconds);

         const endSeconds = p.end_date.seconds;
         p.end_date = new Date(1970, 0, 1)
         p.end_date.setSeconds(endSeconds);
      })

      // Get phases list for each project
      projects.forEach(async (p) => {
         p.phasesObjs = await Promise.all(p.phases.map(async (p) => {
            const docRef = await firebase.collection("phase").doc(p)
            const doc = await docRef.get();
            return doc.data()   
         }))
      })
         
      dispatch({
         type: MANAGER_PROJECT_LIST_SUCCESS,
         payload: projects
      });
   } catch (error) {
      dispatch({
         type: MANAGER_PROJECT_LIST_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};

export const updatePhaseStatus = (phaseId) => async (dispatch) => {
   try {
      dispatch({
         type: PHASE_UPDATE_STATUS_REQUEST,
      });

      await firebase.collection("phase").doc(phaseId).update({
         is_done: true
      });

      dispatch({
         type: PHASE_UPDATE_STATUS_SUCCESS
      });

      dispatch({
         type: PHASE_UPDATE_STATUS_SUCCESS
      });
      
   } catch (error) {
      dispatch({
         type: PHASE_UPDATE_STATUS_FAILED,
         payload:
            error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
      });
   }
};