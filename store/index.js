import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

let devTools = (x) => x;
if (typeof window !== 'undefined') {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (x) => x;
}

const makeStore = () =>
  createStore(reducers, compose(applyMiddleware(thunk), devTools));

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
