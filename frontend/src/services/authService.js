import API from "../api/axios";

export const registerUser = (data) => {
  return API.post("/register", data);
};
export const loginUser = (data) => {
  return API.post("/login", data);
};
