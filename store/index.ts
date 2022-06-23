import uiReducer, { uiSlice } from './slices/ui';
import portfolioReducer, { portfolioSlice } from './slices/portfolio';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

const makeStore = () =>
  configureStore({
    reducer: {
      [uiSlice.name]: uiReducer,
      [portfolioSlice.name]: portfolioReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
