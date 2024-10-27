import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategories = async (page: number) => {
  const response = await axios.get(`${API_URL}/categories?page=${page}`);
  return response.data;
};

export const fetchSelectedCategories = async (userId: string) => {
  const response = await axios.get(`${API_URL}/categories/selected/${userId}`);
  return response.data.selectedCategories || [];
};

export const updateSelectedCategories = async (userId: string, categoryIds: string[]) => {
  await axios.post(`${API_URL}/categories/select`, { userId, categoryIds });
};