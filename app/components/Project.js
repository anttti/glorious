import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import Delete from './Delete';

const DarkItem = styled(Item)`
  background: ${props =>
    props.isHighlighted ? 'rgba(255,255,255,0.07)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

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
      <DarkItem isHighlighted={this.props.isHighlighted} onClick={this.onClick}>
        {this.props.project.title}
        <Delete
          isHighlighted={this.props.isHighlighted}
          onClick={this.onDelete}
        />
      </DarkItem>
    );
  }
}
