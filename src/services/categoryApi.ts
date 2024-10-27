import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/categories';

export const fetchCategories = async (page: number) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

export const fetchSelectedCategories = async (userId: string) => {
  const response = await axios.get(`${API_URL}/selected/${userId}`);
  return response.data.selectedCategories || [];
};

export const updateSelectedCategories = async (userId: string, categoryIds: string[]) => {
  await axios.post(`${API_URL}/select`, { userId, categoryIds });
};