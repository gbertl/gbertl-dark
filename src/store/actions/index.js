import {
  TOGGLE_ISNAV,
  CLOSE_ISNAV,
  FETCH_PROJECTS,
  FETCH_CATEGORIES,
} from '../constants/actionTypes';

export const toggleIsNav = () => {
  return {
    type: TOGGLE_ISNAV,
  };
};

export const closeIsNav = () => {
  return {
    type: CLOSE_ISNAV,
  };
};

export const fetchProjects = (payload) => {
  return {
    type: FETCH_PROJECTS,
    payload,
  };
};

export const fetchCategories = (payload) => {
  return {
    type: FETCH_CATEGORIES,
    payload,
  };
};
