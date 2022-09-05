import axios from "axios";
import { toast } from "react-toastify";
import Logger from "./LogService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    Logger.log(error);
    toast.error("An unexpected error occured.");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  //we do this cause api endpoint requires client to send jwt {for example for editing movie info}
  //we use this function to get rid of bi-directional dependecies
  axios.defaults.headers.common["x-auth-token"] = jwt; //we can set headers on all kinds of http requests {get,post,... requests}. whenever we have request, this token will be included
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
