import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import Delete from './Delete';

const TaskItem = styled(Item)`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'initial')};
  opacity: ${props => (props.isComplete ? 0.5 : 1)};
`;

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClick() {
    this.props.onToggle(this.props.task.id);
  }

  onDelete(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.task.id);
  }

  render() {
    return (
      <TaskItem isComplete={this.props.task.isComplete} onClick={this.onClick}>
        {this.props.task.title}
        <Delete isHighlighted={true} onClick={this.onDelete} />
      </TaskItem>
    );
  }
}
