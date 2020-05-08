import {BACKEND_URL, BACKEND_URL_LOCAL} from 'react-native-dotenv';

import axios from 'axios';

export const getUserWithPhone = async (phoneNumber) => {
  return axios.post(`${BACKEND_URL}/api/serviceProviders/verifyPhone`, {
    phone: phoneNumber,
  });
};

export const registerUser = async (user) => {
  // console.log(BACKEND_URL_LOCAL);
  const back = 'http://192.168.43.19:4002';
  return axios.post(`${back}/api/serviceProviders/register`, user);
};

export const setToken = (headerName, token) => {
  axios.defaults.headers.common[headerName] = token;
};
