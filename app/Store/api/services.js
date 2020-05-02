import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const getServiceTypes = async () => {
  return axios.get(`${BACKEND_URL}/api/serviceTypes`);
};
