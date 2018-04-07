import promiseProps from 'promise-props';
import * as db from '../store/db';

export const INITIAL_LOAD_SUCCESS = 'INITIAL_LOAD_SUCCESS';
export const INITIAL_LOAD_ERROR = 'INITIAL_LOAD_ERROR';
export const CREATE_AREA_SUCCESS = 'CREATE_AREA_SUCCESS';
export const CREATE_AREA_ERROR = 'CREATE_AREA_ERROR';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';
export const LOAD_AREAS_SUCCESS = 'LOAD_AREAS_SUCCESS';
export const LOAD_AREAS_ERROR = 'LOAD_AREAS_ERROR';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_ERROR = 'LOAD_PROJECTS_ERROR';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_ERROR = 'LOAD_TASKS_ERROR';
export const DELETE_AREA_SUCCESS = 'DELETE_AREA_SUCCESS';
export const DELETE_AREA_ERROR = 'DELETE_AREA_ERROR';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const UPDATE_NOTES_SUCCESS = 'UPDATE_NOTES_SUCCESS';
export const UPDATE_NOTES_ERROR = 'UPDATE_NOTES_ERROR';

export const SET_CURRENT_AREA = 'SET_CURRENT_AREA';
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';

export function setCurrentArea(areaId) {
  return {
    type: SET_CURRENT_AREA,
    payload: areaId
  };
}

export function setCurrentProject(projectId) {
  return {
    type: SET_CURRENT_PROJECT,
    payload: projectId
  };
}

export function initialLoad() {
  return async dispatch => {
    try {
      const payload = await promiseProps({
        areas: db.fetchAreas(),
        projects: db.fetchProjects(),
        tasks: db.fetchTasks()
      });

      dispatch({
        type: INITIAL_LOAD_SUCCESS,
        payload
      });
    } catch (err) {
      dispatch({
        type: INITIAL_LOAD_ERROR,
        payload: err
      });
    }
  };
}

export function deleteArea(areaId) {
  return async dispatch => {
    try {
      await db.deleteArea(areaId);
      dispatch({ type: DELETE_AREA_SUCCESS, payload: areaId });
    } catch (err) {
      dispatch({ type: DELETE_AREA_ERROR });
    }
  };
}

export function deleteProject(projectId) {
  return async dispatch => {
    try {
      await db.deleteProject(projectId);
      dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
    } catch (err) {
      dispatch({ type: DELETE_PROJECT_ERROR });
    }
  };
}

export function deleteTask(taskId) {
  return async dispatch => {
    try {
      await db.deleteTask(taskId);
      dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
    } catch (err) {
      dispatch({ type: DELETE_TASK_ERROR });
    }
  };
}

export function createArea(title) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_AREA_SUCCESS,
        payload: await db.createArea(title)
      });
    } catch (err) {
      dispatch({ type: CREATE_AREA_ERROR });
    }
  };
}

export function createProject(areaId, title) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: await db.createProject(areaId, title)
      });
    } catch (err) {
      dispatch({ type: CREATE_PROJECT_ERROR });
    }
  };
}

export function createTask(projectId, title) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: await db.createTask(projectId, title)
      });
    } catch (err) {
      dispatch({ type: CREATE_TASK_ERROR });
    }
  };
}

export function toggleTask(taskId) {
  return async dispatch => {
    dispatch({
      type: TOGGLE_TASK,
      payload: await db.toggleTask(taskId)
    });
  };
}

export function updateNotes(taskId, notes) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_NOTES_SUCCESS,
        payload: await db.updateNotes(taskId, notes)
      });
    } catch (err) {
      dispatch({ type: UPDATE_NOTES_ERROR });
    }
  };
}
