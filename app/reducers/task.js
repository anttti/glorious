import {
  INITIAL_LOAD_SUCCESS,
  CREATE_AREA_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  CREATE_TASK_SUCCESS,
  DELETE_AREA_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  DELETE_TASK_SUCCESS,
  SET_CURRENT_AREA,
  SET_CURRENT_PROJECT,
  TOGGLE_TASK,
  UPDATE_NOTES_SUCCESS
} from '../actions/task';

const initialState = {
  areas: [],
  projects: [],
  tasks: [],
  currentlySelectedAreaId: null,
  currentlySelectedProjectId: null
};

export default function task(state = initialState, action) {
  switch (action.type) {
    case INITIAL_LOAD_SUCCESS:
      return Object.assign({}, initialState, action.payload);
    case SET_CURRENT_AREA:
      return Object.assign({}, state, {
        currentlySelectedAreaId: action.payload,
        currentlySelectedProjectId: null
      });
    case SET_CURRENT_PROJECT:
      return Object.assign({}, state, {
        currentlySelectedProjectId: action.payload
      });
    case CREATE_AREA_SUCCESS:
      return Object.assign({}, state, {
        areas: state.areas.concat([action.payload]),
        currentlySelectedAreaId: action.payload.id,
        currentlySelectedProjectId: null
      });
    case CREATE_TASK_SUCCESS:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([action.payload])
      });
    case CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: state.projects.concat([action.payload])
      });
    case DELETE_AREA_SUCCESS:
      return Object.assign({}, state, {
        areas: state.areas.filter(a => a.id !== action.payload),
        currentlySelectedAreaId:
          action.payload === state.currentlySelectedAreaId
            ? null
            : state.currentlySelectedAreaId
      });
    case DELETE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        projects: state.projects.filter(p => p.id !== action.payload),
        currentlySelectedProjectId:
          action.payload === state.currentlySelectedProjectId
            ? null
            : state.currentlySelectedProjectId
      });
    case DELETE_TASK_SUCCESS:
      return Object.assign({}, state, {
        tasks: state.tasks.filter(t => t.id !== action.payload)
      });
    case TOGGLE_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks
          .filter(t => t.id !== action.payload.id)
          .concat([action.payload])
      });
    case UPDATE_NOTES_SUCCESS:
      return Object.assign({}, state, {
        tasks: state.tasks
          .filter(t => t.id !== action.payload.id)
          .concat([action.payload])
      });
    default:
      return state;
  }
}
