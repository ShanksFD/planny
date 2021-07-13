import {
   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS,
   
   PROJECT_LIST_FAILED,
   PROJECT_LIST_REQUEST,
   PROJECT_LIST_SUCCESS,

   PROJECT_UPDATE_PROFILE_REQUEST,
   PROJECT_UPDATE_PROFILE_SUCCESS,
   PROJECT_UPDATE_PROFILE_FAILED,
   PROJECT_UPDATE_PROFILE_RESET,

   PROJECT_DETAILS_REQUEST,
   PROJECT_DETAILS_SUCCESS,
   PROJECT_DETAILS_FAILED
} from "../constants/projectConstants";

export const projectRegisterReducer = (state = {} , action) => {
   switch (action.type) {
      case PROJECT_REGISTER_REQUEST:
         return { loading: true };
      case PROJECT_REGISTER_SUCCESS:
         return { loading: false, success: true };
      case PROJECT_REGISTER_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const projectListReducer = (state = {projects: [], clients: []}, action) => {
   switch (action.type) {
      case PROJECT_LIST_REQUEST:
         return { loading: true, projects: [], clients: [] };
      case PROJECT_LIST_SUCCESS:
         return { loading: false, projects: action.payload, clients: action.clients };
      case PROJECT_LIST_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const projectUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case PROJECT_UPDATE_PROFILE_REQUEST:
         return { loading: true };
      case PROJECT_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true };
      case PROJECT_UPDATE_PROFILE_FAILED:
         return { loading: false, error: action.payload };
      case PROJECT_UPDATE_PROFILE_RESET:
         return { success: false};
      default:
         return state;
   }
}

export const projectDetailsReducer = (state = {project: {}}, action) => {
   switch (action.type) {
      case PROJECT_DETAILS_REQUEST:
         return { loading: true, project: {}, success: false};
      case PROJECT_DETAILS_SUCCESS:
         return { loading: false, project: action.payload, success: true};
      case PROJECT_DETAILS_FAILED:
         return { loading: false, error: action.payload, success: false};
      default:
         return state;
   }
};