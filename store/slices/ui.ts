import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

interface uiSliceState {
  isTogglerEnabled: boolean;
  isNavOpen: boolean;
  isOverlayActive: boolean;
  isLoading: boolean;
}

const initialState: uiSliceState = {
  isTogglerEnabled: true,
  isNavOpen: false,
  isOverlayActive: false,
  isLoading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToggler: (state) => {
      state.isTogglerEnabled = true;
    },
    hideToggler: (state) => {
      state.isTogglerEnabled = false;
    },
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    closeNav: (state) => {
      state.isNavOpen = false;
    },
    toggleOverlay: (state) => {
      state.isOverlayActive = !state.isOverlayActive;
    },
    showOverlay: (state) => {
      state.isOverlayActive = true;
    },
    hideOverlay: (state) => {
      state.isOverlayActive = false;
    },
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.ui };
    },
  },
});

export const selectUI = (state: AppState) => state.ui;
export const selectIsTogglerEnabled = (state: AppState) =>
  state.ui.isTogglerEnabled;
export const selectIsNavOpen = (state: AppState) => state.ui.isNavOpen;
export const selectIsOverlayActive = (state: AppState) =>
  state.ui.isOverlayActive;
export const selectIsLoading = (state: AppState) => state.ui.isLoading;

export const {
  showToggler,
  hideToggler,
  toggleNav,
  closeNav,
  toggleOverlay,
  showOverlay,
  hideOverlay,
  showLoader,
  hideLoader,
} = uiSlice.actions;

export default uiSlice.reducer;
