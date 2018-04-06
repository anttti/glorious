import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';

// const Item = styled.li`
//   margin-bottom: 5px;
//   font-weight: ${props => (props.isHighlighted ? 'bold' : 'normal')};
//   cursor: pointer;
//   -webkit-user-select: none;
// `;

const Delete = styled.span``;

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.project.id);
  }

  onDelete() {
    this.props.onDelete(this.props.project.id);
  }

  render() {
    return (
      <Item isHighlighted={this.props.isHighlighted} onClick={this.onClick}>
        {this.props.project.title}
        (<Delete onClick={this.onDelete}>Delete</Delete>)
      </Item>
    );
  }
}
