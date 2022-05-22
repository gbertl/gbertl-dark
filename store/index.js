import uiReducer, { uiSlice } from './slices/ui';
import portfolioReducer, { portfolioSlice } from './slices/portfolio';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

const makeStore = () =>
  configureStore({
    reducer: {
      [uiSlice.name]: uiReducer,
      [portfolioSlice.name]: portfolioReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
