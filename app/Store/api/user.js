import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const getUserWithPhone = async (phoneNumber) => {
  return axios.post(`${BACKEND_URL}/api/serviceProviders/verifyPhone`, {
    phone: phoneNumber,
  });
};

export const registerUser = async (user) => {
  return axios.post(`${BACKEND_URL}/api/serviceProviders/register`, user);
};

export const setToken = (headerName, token) => {
  axios.defaults.headers.common[headerName] = token;
};
