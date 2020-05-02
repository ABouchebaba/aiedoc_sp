import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const products = async () => {
  return axios.get(`${BACKEND_URL}/api/products/`);
};

export const categories = async () => {
    return axios.get(`${BACKEND_URL}/api/categories/`);
  };

export const setCommand = async (data) => {
  return axios.post(`${BACKEND_URL}/api/commands/`,data)
}
