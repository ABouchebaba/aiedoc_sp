import {BACKEND_URL} from 'react-native-dotenv';

import axios from 'axios';

export const getServices = async () => {
  return axios.get(`${BACKEND_URL}/api/services`);
};
