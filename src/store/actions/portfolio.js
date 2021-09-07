import { replaceCategories, replaceProjects } from '.';
import * as api from '../../api';

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
