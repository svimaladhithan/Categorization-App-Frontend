import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (values: { email: string; password: string }) => {
  return await axios.post(`${BASE_URL}/auth/login-user`, values);
};

export const registerUser = async (values: { username: string; email: string; password: string }) => {
  return await axios.post(`${BASE_URL}/auth/register-user`, values);
};

export const verifyCode = async (email: string, code: string) => {
  return await axios.post(`${BASE_URL}/auth/verify`, { email, code });
};