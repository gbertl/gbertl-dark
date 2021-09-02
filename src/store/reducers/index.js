import { combineReducers } from 'redux';
import isNavOpenReducer from './isNavOpenReducer';
import projects from './projectReducer';

const reducers = combineReducers({
  isNavOpen: isNavOpenReducer,
  projects,
});

export default reducers;
