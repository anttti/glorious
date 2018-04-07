import React from 'react';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const Container = styled.ul`
  padding: 0px 10px 10px 30px;
  font-size: 14px;
  color: #4f4f4f;
`;

const NoteEditor = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 5px;
  margin-top: 5px;
  border: 0;
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const AddNotes = styled.div`
  color: #09cebf;
  cursor: pointer;
`;

const Notes = styled.li`
  margin-top: 5px;
  padding-left: 10px;
  border-left: 5px solid rgba(0, 0, 0, 0.05);

  p {
    font-size: 14px;
  }
`;

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.onUpdateNotes = this.onUpdateNotes.bind(this);

    this.state = {
      isEditingNotes: false
    };
  }

  onUpdateNotes(e) {
    console.log('editing', e.target.value);
    this.props.onUpdateNotes(e.target.value);
  }

  toggleEditing(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState(oldState => {
      return {
        isEditingNotes: !oldState.isEditingNotes
      };
    });
  }

  renderNotes() {
    if (this.state.isEditingNotes) {
      return (
        <li>
          <NoteEditor value={this.props.notes} onChange={this.onUpdateNotes} />
        </li>
      );
    }
    return (
      <Notes>
        <p>{this.props.notes}</p>
        <AddNotes onClick={this.toggleEditing}>Edit</AddNotes>
      </Notes>
    );
  }

  render() {
    const dateCreated = format(
      parse(this.props.task.dateCreated),
      'DD.MM.YYYY'
    );
    const dateFinished = this.props.task.dateFinished
      ? format(parse(this.props.task.dateFinished), 'DD.MM.YYYY')
      : '-';

    return (
      <Container>
        <li>Date created: {dateCreated}</li>
        <li>Date finished: {dateFinished}</li>

        {this.state.isEditingNotes || this.props.task.notes ? (
          this.renderNotes()
        ) : (
          <li>
            <AddNotes onClick={this.toggleEditing}>Add notes...</AddNotes>
          </li>
        )}
      </Container>
    );
  }
}
