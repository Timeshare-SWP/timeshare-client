
import axios from "axios";
import { getTokenFromCookie } from "./handleToken";

const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInstanceWithToken = () => {
  const currentToken = getTokenFromCookie();
  return createAxiosInstance(currentToken);
};
