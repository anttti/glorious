import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as TaskActions from '../actions/task';

function mapStateToProps(state) {
  return {
    areas: state.task.areas,
    projects: state.task.projects,
    tasks: state.task.tasks,
    currentProjects: state.task.projects.filter(
      p => p.area === state.task.currentlySelectedAreaId
    ),
    currentTasks: state.task.tasks.filter(
      t => t.project === state.task.currentlySelectedProjectId
    ),
    currentlySelectedAreaId: state.task.currentlySelectedAreaId,
    currentlySelectedProjectId: state.task.currentlySelectedProjectId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TaskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
