import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import task from './task';

const rootReducer = combineReducers({
  task,
  router
});

export default rootReducer;
