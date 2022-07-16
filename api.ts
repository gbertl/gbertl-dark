import axios from './axios';

export const getProject = (id: string, populating: string[] = []) =>
  axios.get(`/projects/${id}`, {
    params: {
      populating,
    },
  });

export const getProjects = (
  ordering: string[] = [],
  populating: string[] = [],
  selects: string[] = []
) =>
  axios.get('/projects', {
    params: {
      ordering,
      populating,
      selects,
    },
  });

export const getCategories = (ordering: string[] = []) =>
  axios.get('/categories', {
    params: {
      ordering,
    },
  });
