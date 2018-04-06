import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Label = styled.span``;

const Delete = styled.i`
  position: relative;
  top: 2px;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }
`;

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.area.id);
  }

  onDelete() {
    this.props.onDelete(this.props.area.id);
  }

  render() {
    return (
      <Item isHighlighted={this.props.isHighlighted} onClick={this.onClick}>
        <Label>{this.props.area.title}</Label>
        <Delete onClick={this.onDelete} className="fas fa-times-circle" />
      </Item>
    );
  }
}
