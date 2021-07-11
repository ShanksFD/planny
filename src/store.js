import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, 
   userListReducer, 
   userRegisterReducer, 
   userDetailsReducer, 
   userUpdateReducer, 
   userDeleteReducer,
   projectManagerListReducer
   } from "./reducers/userReducers";
import {projectRegisterReducer, projectListReducer} from "./reducers/projectReducers"
import {clientRegisterReducer} from "./reducers/clientReducers"

const reducer = combineReducers({
   userLogin: userLoginReducer,
   usersList: userListReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: userUpdateReducer,
   userDelete: userDeleteReducer,
   projectManagerList: projectManagerListReducer,

   clientRegister: clientRegisterReducer,

   projectRegister: projectRegisterReducer,
   projectsList: projectListReducer
});

// load data from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

// Initialize state when page is refreshed localy
const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
