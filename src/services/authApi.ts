import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000/api/auth";

export const loginUser = async (values: { email: string; password: string }) => {
  return await axios.post(`${BASE_URL}/login-user`, values);
};

export const registerUser = async (values: { username: string; email: string; password: string }) => {
  return await axios.post(`${BASE_URL}/register-user`, values);
};

export const verifyCode = async (email: string, code: string) => {
  return await axios.post(`${BASE_URL}/verify`, { email, code });
};