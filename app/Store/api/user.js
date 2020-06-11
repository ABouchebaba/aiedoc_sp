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
  console.log(BACKEND_URL);
  return RNFetchBlob.fetch(
    'POST',
    `${BACKEND_URL}/api/serviceProviders/register`,
    {
      'Content-Type': 'multipart/form-data',
    },
    user,
  );
};

export const setToken = (headerName, token) => {
  axios.defaults.headers.common[headerName] = token;
};
