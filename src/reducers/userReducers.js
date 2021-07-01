import {
   USER_LOGIN_FAILED,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   
   USER_LOGOUT_FAILED,
   USER_LOGOUT_SUCCESS,

   USER_LIST_FAILED,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,

   USER_REGISTER_FAILED,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST: 
         return { loading: true };

      case USER_LOGIN_SUCCESS:
         return { loading: false, userInfo: action.payload };

      case USER_LOGIN_FAILED:
         return { loading: false, error: action.payload };

      case USER_LOGOUT_SUCCESS:
         return {};

      case USER_LOGOUT_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const userListReducer = (state = {users: []}, action) => {
   switch (action.type) {
      case USER_LIST_REQUEST:
         return { loading: true, users: [] };
      case USER_LIST_SUCCESS:
         return { loading: false, users: action.payload };
      case USER_LIST_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const userRegisterReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAILED:
         return { loading: false, error: action.payload };
      case USER_LOGOUT_SUCCESS:
         return {}
      default:
         return state;
   }
};