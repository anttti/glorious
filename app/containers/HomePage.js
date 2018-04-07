import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as TaskActions from '../actions/task';

function mapStateToProps(state) {
  const currentTasks = state.task.tasks.filter(
    t => t.project === state.task.currentlySelectedProjectId
  );

  const currentDoneTasks = currentTasks
    .filter(t => t.isComplete)
    .sort((a, b) => a.dateCompleted - b.dateCompleted);
  const currentNotDoneTasks = currentTasks
    .filter(t => !t.isComplete)
    .sort((a, b) => a.dateCreated - b.dateCreated);

  const currentT = currentNotDoneTasks.concat(currentDoneTasks);

  return {
    areas: state.task.areas,
    projects: state.task.projects,
    tasks: state.task.tasks,
    currentProjects: state.task.projects.filter(
      p => p.area === state.task.currentlySelectedAreaId
    ),
    currentTasks: currentT,
    currentlySelectedAreaId: state.task.currentlySelectedAreaId,
    currentlySelectedProjectId: state.task.currentlySelectedProjectId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TaskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
