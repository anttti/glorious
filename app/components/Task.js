import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';

const TaskItem = styled(Item)`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'initial')};
  opacity: ${props => (props.isComplete ? 0.5 : 1)};
`;

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onToggle(this.props.task.id);
  }

  render() {
    return (
      <TaskItem isComplete={this.props.task.isComplete} onClick={this.onClick}>
        {/* <input type="checkbox" checked={this.props.task.isComplete} readOnly /> */}
        {this.props.task.title}
      </TaskItem>
    );
  }
}
