import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_LIST_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAILED,
  USER_DELETE_SUCCESS,
  USER_MANAGER_LIST_REQUEST,
  USER_MANAGER_LIST_FAILED,
  USER_MANAGER_LIST_SUCCESS,
} from "../constants/userConstants";
import firebase, { auth } from "../firebase";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Login user
    const authData = await auth.signInWithEmailAndPassword(email, password);

    // grab and assign added user
    const docRef = firebase.collection("users").doc(authData.user.uid);
    const doc = await docRef.get();
    const data = doc.data();

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();

    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const snapshot = await firebase.collection("users").get();
    const data = snapshot.docs.map((doc) => doc.data());

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register =
  (
    first_name,
    last_name,
    email,
    password,
    phone_number,
    admin,
    director,
    projectManager,
    accountingManager,
    secretary
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const authData = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      var user = {
        uid: authData.user.uid,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        is_admin: admin,
        is_director: director,
        is_accountingManager: accountingManager,
        is_projectManager: projectManager,
        is_secretary: secretary,
        email: authData.user.email,
      };

      // Add user details
      await firebase.collection("users").doc(authData.user.uid).set(user);

      // grab and assign added user
      const docRef = firebase.collection("users").doc(authData.user.uid);
      const doc = await docRef.get();
      const data = doc.data();

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // grab and assign added user
    const docRef = await firebase.collection("users").doc(id);
    const doc = await docRef.get();
    const data = doc.data();

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    await firebase.collection("users").doc(user.uid).update(user);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
      loading: true,
    });

    await firebase.collection("users").doc(id).delete();

    dispatch({
      type: USER_DELETE_SUCCESS,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getProjectManagerList = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_MANAGER_LIST_REQUEST,
    });

    const snapshot = await firebase
      .collection("users")
      .where("is_projectManager", "==", true)
      .get();
    const data = snapshot.docs.map((doc) => doc.data());

    dispatch({
      type: USER_MANAGER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_MANAGER_LIST_FAILED,
      payload: error.message,
    });
  }
};
