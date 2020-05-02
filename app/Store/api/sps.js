import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const setState = async (id, state) => {
  return axios.put(`${BACKEND_URL}/api/serviceProviders/${id}/state`, {
    state,
  });
};
