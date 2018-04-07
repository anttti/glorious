import React, { Component } from 'react';
import styled from 'styled-components';
import Area from './Area';
import Project from './Project';
import Task from './Task';
import AddNew from './AddNew';

const View = styled.div`
  display: flex;
  flex-direction: row;
`;

const Panel = styled.div`
  flex: 1;
  min-height: 100vh;
  padding-top: 15px;
`;

const FirstPanel = styled(Panel)`
  flex: 0.5;
  background: #3d4241;
  color: white;
`;

const SecondPanel = styled(FirstPanel)`
  flex: 0.5;
  background: #4b4f4e;
`;

const Title = styled.h1`
  margin-left: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  color: #09cebf;
`;

const List = styled.ul`
  margin-bottom: 15px;
`;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onCreateArea = this.onCreateArea.bind(this);
    this.onCreateProject = this.onCreateProject.bind(this);
    this.onCreateTask = this.onCreateTask.bind(this);
  }

  onCreateArea(title) {
    if (title.trim().length > 0) {
      this.props.createArea(title);
    }
  }

  onCreateProject(title) {
    if (this.props.currentlySelectedAreaId && title.trim().length > 0) {
      this.props.createProject(this.props.currentlySelectedAreaId, title);
    }
  }

  onCreateTask(title) {
    if (this.props.currentlySelectedProjectId && title.trim().length > 0) {
      this.props.createTask(this.props.currentlySelectedProjectId, title);
    }
  }

  render() {
    return (
      <View>
        <FirstPanel>
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
          <AddNew onSave={this.onCreateArea} />
        </FirstPanel>

        <SecondPanel>
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
          <AddNew
            onSave={this.onCreateProject}
            isDisabled={!this.props.currentlySelectedAreaId}
          />
        </SecondPanel>

        <Panel>
          <Title>Tasks</Title>
          <List>
            {this.props.currentTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onDelete={this.props.deleteTask}
                onToggle={this.props.toggleTask}
              />
            ))}
          </List>
          <AddNew
            onSave={this.onCreateTask}
            isDisabled={!this.props.currentlySelectedProjectId}
            isLight
          />
        </Panel>
      </View>
    );
  }
}
