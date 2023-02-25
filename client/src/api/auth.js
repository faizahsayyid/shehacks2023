import axios from "axios";
import { cacheTokens } from "../utils/authUtils";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const { data, status } = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    cacheTokens(data.idToken, data.refreshToken);
    return { data, status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export const register = async (email, password) => {
  try {
    const { data, status } = await axios.post(`${apiUrl}/auth/register`, {
      email,
      password,
    });
    cacheTokens(data.idToken, data.refreshToken);
    return { data, status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
