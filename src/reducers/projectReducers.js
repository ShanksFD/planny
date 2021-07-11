import {
   PROJECT_REGISTER_FAILED,
   PROJECT_REGISTER_REQUEST,
   PROJECT_REGISTER_SUCCESS,
   PROJECT_LIST_FAILED,
   PROJECT_LIST_REQUEST,
   PROJECT_LIST_SUCCESS
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

export const projectListReducer = (state = {projects: []}, action) => {
   switch (action.type) {
      case PROJECT_LIST_REQUEST:
         return { loading: true, projects: [] };
      case PROJECT_LIST_SUCCESS:
         return { loading: false, projects: action.payload };
      case PROJECT_LIST_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};