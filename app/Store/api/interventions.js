import {BACKEND_URL} from 'react-native-dotenv';
import axios from 'axios';

export const getInterventionById = async (id) => {
  return axios.get(`${BACKEND_URL}/api/interventions/${id}`);
};
