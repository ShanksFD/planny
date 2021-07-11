import {
   CLIENT_REGISTER_FAILED,
   CLIENT_REGISTER_REQUEST,
   CLIENT_REGISTER_SUCCESS
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
