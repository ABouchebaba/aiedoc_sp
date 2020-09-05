import {BACKEND_URL} from 'react-native-dotenv';

import RNFetchBlob from 'rn-fetch-blob';

import axios from 'axios';

export const getUserWithPhone = async ({phoneNumber, pushNotificationId}) => {
  return axios.post(`${BACKEND_URL}/api/serviceProviders/verifyPhone`, {
    phone: phoneNumber,
    pushNotificationId,
  });
};

export const registerUser = async (user) => {
  return RNFetchBlob.fetch(
    'POST',

    `${BACKEND_URL}/api/serviceProviders/register`,
    {
      'Content-Type': 'multipart/form-data',
    },
    user,
  );
};

export const update_picture = async (id, picture, token) => {
  return RNFetchBlob.fetch(
    'PUT',
    `${BACKEND_URL}/api/serviceProviders/${id}/picture`,
    {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
    picture,
  );
};

export const setToken = (headerName, token) => {
  axios.defaults.headers.common[headerName] = token;
};

export const get_balance = () => {
  return axios.get(`${BACKEND_URL}/api/serviceProviders/me/balance`);
};
