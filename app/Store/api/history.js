import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const commands = async (id) => {
  return axios.get(`${BACKEND_URL}/api/serviceProviders/${id}/commands/`);
};

export const interventions = async (id) => {
    return axios.get(`${BACKEND_URL}/api/serviceProviders/${id}/interventions/`);
  };
