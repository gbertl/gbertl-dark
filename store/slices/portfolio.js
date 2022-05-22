import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import * as api from '../../api';

export const fetchProjects = createAsyncThunk(
  'portfolio/fetchProjects',
  async () => {
    const { data } = await api.getProjects();
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  'portfolio/fetchCategories',
  async () => {
    const { data } = await api.getCategories();
    return data;
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    projects: [],
    categories: [],
  },
  reducers: {
    replaceProjects: (state, action) => {
      state.projects = action.payload;
    },
    replaceCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const nextState = {
        ...state,
        ...action.payload.portfolio,
      };

      if (!action.payload.portfolio.projects.length)
        nextState.projects = state.projects;

      if (!action.payload.portfolio.categories.length)
        nextState.categories = state.categories;

      return nextState;
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
    },
    [fetchProjects.rejected]: (state, action) => {
      console.log(action.error);
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      console.log(action.error);
    },
  },
});

export const selectProjects = (state) => state.portfolio.projects;
export const selectCategories = (state) => state.portfolio.categories;

export const { replaceProjects, replaceCategories } = portfolioSlice.actions;

export default portfolioSlice.reducer;
