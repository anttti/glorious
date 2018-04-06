import {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR
} from '../actions/task';

export default function project(state = [], action) {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return state.concat([action.payload]);
    case CREATE_PROJECT_ERROR:
    case LOAD_PROJECTS_ERROR:
      return state;
    case LOAD_PROJECTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
