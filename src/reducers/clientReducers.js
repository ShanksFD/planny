import {
   CLIENT_REGISTER_FAILED,
   CLIENT_REGISTER_REQUEST,
   CLIENT_REGISTER_SUCCESS,
   
   CLIENT_DETAILS_REQUEST,
   CLIENT_DETAILS_FAILED,
   CLIENT_DETAILS_SUCCESS
} from "../constants/clientConstants";

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

export const clientDetailsReducer = (state = {user: {}}, action) => {
   switch (action.type) {
      case CLIENT_DETAILS_REQUEST:
         return { loading: true, user: {}};
      case CLIENT_DETAILS_SUCCESS:
         return { loading: false, user: action.payload, success: true};
      case CLIENT_DETAILS_FAILED:
         return { loading: false, error: action.payload,};
      default:
         return state;
   }
};