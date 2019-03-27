import * as actionTypes from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import { setErrors } from "./errorsAction";

const instance = axios.create({ baseURL: "http://coffee.q8fawazo.me/api" });

export const checkForExpiredToken = () => {
  return async dispatch => {
    // Get token
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // console.log((user.exp - currentTime) / 60);

      // Check token expiration
      if (user.exp >= currentTime) {
        console.log("checkForExpiredToken");
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = async token => {
  if (token) {
    console.log("============");
    console.log("setAuthToken => token: ", token);
    console.log("============");

    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const login = (userData, navigation) => {
  return async dispatch => {
    try {
      let response = await instance.post("/login/", userData);
      let user = response.data;
      let decodedUser = jwt_decode(user.token);

      console.log("============");
      console.log("login => userData: ", userData);
      console.log("============");

      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));

      navigation.replace("Profile");
    } catch (error) {
      dispatch(setErrors(error.response.data));
      console.error(error.response.data);
    }
  };
};

export const signup = (userData, navigation) => {
  return async dispatch => {
    try {
      let response = await instance.post("/register/", userData);
      // let user = response.data;
      console.log("============");
      console.log("signup => userData: ", userData);
      console.log("============");

      dispatch(login(userData, navigation));

      // let decodedUser = jwt_decode(user.token);
      // setAuthToken(user.token);

      // dispatch(setCurrentUser(decodedUser));
    } catch (error) {
      dispatch(setErrors(error.response.data));
      console.error(error.response.data);
    }
  };
};

const setCurrentUser = user => {
  console.log("setCurrentUser setCurrentUser setCurrentUser");
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};
