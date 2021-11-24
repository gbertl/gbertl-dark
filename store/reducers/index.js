import { combineReducers } from 'redux';
import ui from './ui';
import portfolio from './portfolio';
import { HYDRATE } from 'next-redux-wrapper';

const combinedReducer = combineReducers({
  ui,
  portfolio,
});

const reducers = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state.portfolio.projects.length) {
      nextState.portfolio.projects = state.portfolio.projects;
    }

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducers;
