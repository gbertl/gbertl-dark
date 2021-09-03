import { combineReducers } from 'redux';
import isNavOpen from './isNavOpen';
import projects from './projects';

const reducers = combineReducers({
  isNavOpen,
  projects,
});

export default reducers;
