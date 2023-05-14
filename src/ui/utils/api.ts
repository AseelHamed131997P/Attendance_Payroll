import axios, { AxiosError } from "axios";
import config from "config";
import { identity } from "lodash";

const api = axios.create({
  baseURL: config.api.endpoint,
});

api.interceptors.request.use((request) => {
  return request;
});

api.interceptors.response.use(identity, (error: AxiosError) => {
  error.message = "something went wrong please try again";
  return Promise.reject(error);
});

export default api;

