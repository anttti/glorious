import React, { Component } from 'react';
import styled from 'styled-components';
import Area from './Area';
import Project from './Project';
import Task from './Task';

const View = styled.div`
  display: flex;
  flex-direction: row;
`;

const Panel = styled.div`
  flex: 1;
  padding-top: 15px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin-left: 15px;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  color: #09cebf;
`;

const List = styled.ul`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onCreateArea = this.onCreateArea.bind(this);
    this.onCreateProject = this.onCreateProject.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
    this.onChangeAreaTitle = this.onChangeAreaTitle.bind(this);
    this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);
    this.onChangeTaskTitle = this.onChangeTaskTitle.bind(this);

    this.state = {
      areaTitle: '',
      projectTitle: '',
      taskTitle: ''
    };
  }

  onCreateArea(e) {
    e.preventDefault();
    if (this.state.areaTitle.trim().length > 0) {
      this.props.createArea(this.state.areaTitle);
      this.setState({ areaTitle: '' });
    }
  }

  onCreateProject(e) {
    e.preventDefault();
    if (
      this.props.currentlySelectedAreaId &&
      this.state.projectTitle.trim().length > 0
    ) {
      this.props.createProject(
        this.props.currentlySelectedAreaId,
        this.state.projectTitle
      );
      this.setState({ projectTitle: '' });
    }
  }

  onCreateTask(e) {
    e.preventDefault();
    if (
      this.props.currentlySelectedProjectId &&
      this.state.taskTitle.trim().length > 0
    ) {
      this.props.createTask(
        this.props.currentlySelectedProjectId,
        this.state.taskTitle
      );
      this.setState({ taskTitle: '' });
    }
  }

  onChangeAreaTitle(e) {
    this.setState({ areaTitle: e.target.value });
  }

  onChangeProjectTitle(e) {
    this.setState({ projectTitle: e.target.value });
  }

  onChangeTaskTitle(e) {
    this.setState({ taskTitle: e.target.value });
  }

  render() {
    return (
      <View>
        <Panel>
          <Title>Areas</Title>
          <List>
            {this.props.areas.map(area => (
              <Area
                key={area.id}
                onClick={this.props.setCurrentArea}
                onDelete={this.props.deleteArea}
                isHighlighted={this.props.currentlySelectedAreaId === area.id}
                area={area}
              />
            ))}
          </List>
          <form onSubmit={this.onCreateArea}>
            <Input
              value={this.state.areaTitle}
              onChange={this.onChangeAreaTitle}
            />
          </form>
        </Panel>

        <Panel>
          <Title>Projects</Title>
          <List>
            {this.props.currentProjects.map(project => (
              <Project
                key={project.id}
                onClick={this.props.setCurrentProject}
                onDelete={this.props.deleteProject}
                isHighlighted={
                  this.props.currentlySelectedProjectId === project.id
                }
                project={project}
              />
            ))}
          </List>
          <form onSubmit={this.onCreateProject}>
            <Input
              value={this.state.projectTitle}
              onChange={this.onChangeProjectTitle}
              disabled={!this.props.currentlySelectedAreaId}
            />
          </form>
        </Panel>

        <Panel>
          <Title>Tasks</Title>
          <List>
            {this.props.currentTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onToggle={this.props.toggleTask}
              />
            ))}
          </List>
          <form onSubmit={this.onCreateTask}>
            <Input
              value={this.state.taskTitle}
              onChange={this.onChangeTaskTitle}
            />
          </form>
        </Panel>
      </View>
    );
  }
}
