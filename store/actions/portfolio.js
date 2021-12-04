import * as api from '../../api';
import { REPLACE_PROJECTS, REPLACE_CATEGORIES } from '../constants/actionTypes';

export const replaceProjects = (payload) => ({
  type: REPLACE_PROJECTS,
  payload,
});

export const replaceCategories = (payload) => ({
  type: REPLACE_CATEGORIES,
  payload,
});

export const fetchProjects = () => async (dispatch) => {
  try {
    const { data } = await api.getProjects();
    dispatch(replaceProjects(data));
  } catch (e) {
    console.log(e);
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch(replaceCategories(data));
  } catch (e) {
    console.log(e);
  }
};
