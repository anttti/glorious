import React from 'react';
import styled from 'styled-components';

const Closed = styled.div`
  padding: 5px 20px;
  color: #09cebf;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  -webkit-user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Form = styled.form`
  position: relative;
  padding: 5px 15px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 5px;
  border: 0;
  border-bottom: 2px solid #09cebf;
  font-size: 16px;
  background: ${props => (props.isLight ? '#f0f4f4' : 'transparent')};
  color: ${props => (props.isLight ? 'black' : 'white')};

  &:active,
  &:focus {
    outline: none;
    background: ${props => (props.isLight ? '#f0f4f4' : 'transparent')};
  }
`;

const Cancel = styled.div`
  position: absolute;
  right: 20px;
  top: 9px;
  color: #09cebf;
`;

export default class AddNew extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();

    this.onToggle = this.onToggle.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.state = {
      title: '',
      isOpen: false
    };
  }

  onToggle() {
    this.setState(
      oldState => {
        return {
          title: '',
          isOpen: !oldState.isOpen
        };
      },
      () => {
        if (this.state.isOpen) {
          // TÄHÄ JÄI BARFFF

          this.input.focus();
        }
      }
    );
  }

  onSave(e) {
    e.preventDefault();
    this.props.onSave(this.state.title);
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  render() {
    if (this.props.isDisabled) {
      return null;
    }

    if (!this.state.isOpen) {
      return <Closed onClick={this.onToggle}>Add new...</Closed>;
    }

    return (
      <Form onSubmit={this.onSave}>
        <Input
          ref={this.input}
          value={this.state.title}
          onChange={this.onChangeTitle}
          isLight={this.isLight}
        />
        <Cancel onClick={this.onToggle}>
          <i className="fas fa-times-circle" />
        </Cancel>
      </Form>
    );
  }
}