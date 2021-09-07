import {
  TOGGLE_ISNAV,
  CLOSE_ISNAV,
  REPLACE_PROJECTS,
  REPLACE_CATEGORIES,
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

export const replaceProjects = (payload) => {
  return {
    type: REPLACE_PROJECTS,
    payload,
  };
};

export const replaceCategories = (payload) => {
  return {
    type: REPLACE_CATEGORIES,
    payload,
  };
};
