import { combineReducers } from 'redux';
import ui from './ui';
import portfolio from './portfolio';

const reducers = combineReducers({
  ui,
  portfolio,
});

export default reducers;
