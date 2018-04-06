import React, { Component } from 'react';
// import styled from 'styled-components';
import Item from './Item';

// const Item = styled.li`
//   margin-bottom: 5px;
//   text-decoration: ${props => (props.isComplete ? 'line-through' : 'initial')};
//   cursor: pointer;
//   -webkit-user-select: none;
// `;

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
      <Item isComplete={this.props.task.isComplete} onClick={this.onClick}>
        <input type="checkbox" checked={this.props.task.isComplete} readOnly />
        {this.props.task.title}
      </Item>
    );
  }
}
