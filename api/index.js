import { protectedRoute, axiosInstance } from '../axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import client from '../apollo-client';
import { gql } from '@apollo/client';

export const getProjects = () =>
  client.query({
    query: gql`
      query {
        projects(orderBy: ["priority_order"]) {
          title
          description
          livePreview
          sourceCode
          technologyList
          categoryList
          screenshotList(orderBy: ["priority_order"])
        }
      }
    `,
  });

export const getCategories = () =>
  client.query({
    query: gql`
      query {
        categories(orderBy: ["priority_order"]) {
          name
          title
        }
      }
    `,
  });

export const login = async (credentials) => {
  const cookies = new Cookies();

  try {
    const response = await axiosInstance.post('/token/', credentials);

    const { access, refresh } = response.data;

    cookies.set('accessToken', access, {
      path: '/',
      expires: dayjs.unix(jwt_decode(access).exp).toDate(),
    });
    cookies.set('refreshToken', refresh, {
      path: '/',
      expires: dayjs.unix(jwt_decode(refresh).exp).toDate(),
    });

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
