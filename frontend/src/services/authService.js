import API from "../api/axios";

export const registerUser = (data) => {
  return API.post("/register", data);
};