import { protectedRoute, axiosInstance } from '../axios';

export const getProjects = () => axiosInstance.get('/projects/');
export const getCategories = () => axiosInstance.get('/categories/');
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/token/', credentials);
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    protectedRoute.defaults.headers[
      'Authorization'
    ] = `Bearer ${response.data.access}`;
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateProject = (id, updatedProject) =>
  protectedRoute.patch(`/projects/${id}/`, updatedProject);
