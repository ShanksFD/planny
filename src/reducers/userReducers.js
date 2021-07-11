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

   USER_DELETE_FAILED,
   USER_DELETE_SUCCESS,
   USER_DELETE_REQUEST
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

export const userDetailsReducer = (state = {user: {}}, action) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return { loading: true, user: {}};
      case USER_DETAILS_SUCCESS:
         return { loading: false, user: action.payload, success: true};
      case USER_DETAILS_FAILED:
         return { loading: false, error: action.payload,};
      default:
         return state;
   }
};

export const userUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
         return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
         return { loading: false, success: true };
      case USER_UPDATE_PROFILE_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
}

export const userDeleteReducer = (state = {} , action) => {
   switch (action.type) {
      case USER_DELETE_REQUEST:
         return { loading: true};
      case USER_DELETE_SUCCESS:
         return { loading: false, success: true};
      case USER_DELETE_FAILED:
         return { loading: false, error: action.payload};
      default:
         return state;
   }
};

export const clientRegisterReducer = (state = {} , action) => {
   switch (action.type) {
      case CLIENT_REGISTER_REQUEST:
         return { loading: true};
      case CLIENT_REGISTER_SUCCESS:
         return { loading: false, clientId: action.payload };
      case CLIENT_REGISTER_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const projectRegisterReducer = (state = {} , action) => {
   switch (action.type) {
      case PROJECT_REGISTER_REQUEST:
         return { loading: true };
      case PROJECT_REGISTER_SUCCESS:
         return { loading: false };
      case PROJECT_REGISTER_FAILED:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};