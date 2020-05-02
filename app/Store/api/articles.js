import { BACKEND_URL } from "react-native-dotenv";

export const loadArticles = async () => {
  return fetch(`${BACKEND_URL}/api/articles`, {
    cache: "no-cache",
    keepalive: false,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
