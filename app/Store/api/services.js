import {BACKEND_URL} from 'react-native-dotenv';

import axios from 'axios';

export const getServices = async () => {
  console.log('BACKEND_URL', BACKEND_URL)
  return axios.get(`${BACKEND_URL}/api/services`);
};
