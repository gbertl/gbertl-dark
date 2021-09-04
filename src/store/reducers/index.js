import { combineReducers } from 'redux';
import isNavOpen from './isNavOpen';
import portfolio from './portfolio';

const reducers = combineReducers({
  isNavOpen,
  portfolio,
});

export default reducers;
