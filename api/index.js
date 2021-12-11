import { protectedRoute, axiosInstance } from '../axios';
import Cookies from 'universal-cookie';

export const getProjects = () => axiosInstance.get('/projects/');

export const getCategories = () => axiosInstance.get('/categories/');

export const login = async (credentials) => {
  const cookies = new Cookies();

  try {
    const response = await axiosInstance.post('/token/', credentials);

    cookies.set('accessToken', response.data.access, { path: '/' });
    cookies.set('refreshToken', response.data.refresh, { path: '/' });

    protectedRoute.defaults.headers['Authorization'] = `Bearer ${cookies.get(
      'accessToken'
    )}`;

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProject = (id, updatedProject) =>
  protectedRoute.put(`/projects/${id}/`, updatedProject);

export const getProjectDetail = (id) => axiosInstance.get(`/projects/${id}/`);

export const getScreenshots = () => axiosInstance.get('/screenshots/');

export const refreshToken = async (refreshToken) => {
  try {
    const { data } = await axiosInstance.post('/token/refresh/', {
      refresh: refreshToken,
    });
    return data.access;
  } catch (e) {
    throw new Error(e.message);
  }
};
