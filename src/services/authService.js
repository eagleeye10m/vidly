import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt()); //we get rid of bi-directional dependencies.

export async function login(userData) {
  const { data: jwt } = await http.post(apiEndPoint, userData); //JWT stands for Json web tokens // this is a token we get from sending the users information and its a kind of ticket
  localStorage.setItem(tokenKey, jwt); //takes to parameters, both of them are string => key and value
}

export function loginWithJwt(jwt) {
  //this login is only for users who register newly and they dont have to login again
  localStorage.setItem(tokenKey, jwt); //every browser has an small database. in this database we can store key value pairs
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt); //decodes the json web token that is stored in the browser local storage and returns the user info
  } catch (error) {
    return null;
    //We used try catch because of an anonymouse users(users without jwt)
  } //if we have any errors, we ignore that, cause its not an application error and we just want the app works in case we don't have a valid json web token
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
