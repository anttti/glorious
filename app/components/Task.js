import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import Delete from './Delete';
import Expand from './Expand';
import Save from './Save';
import TaskInfo from './TaskInfo';

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskItem = styled(Item)`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'initial')};
  opacity: ${props => (props.isComplete ? 0.5 : 1)};
`;

const Controls = styled.div`
  display: flex;
`;

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onUpdateNotes = this.onUpdateNotes.bind(this);

    this.state = {
      isOpen: false,
      notes: this.props.task.notes
    };
  }

  onClick() {
    this.props.onToggle(this.props.task.id);
  }

  onExpand(e) {
    if (e) {
      e.stopPropagation();
    }
    this.setState(oldState => {
      return {
        isOpen: !oldState.isOpen
      };
    });
  }

  onDelete(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.task.id);
  }

  onSave(e) {
    e.stopPropagation();
    this.props.onUpdateNotes(this.props.task.id, this.state.notes);
    this.onExpand();
  }

  onUpdateNotes(notes) {
    this.setState({ notes });
  }

  render() {
    return (
      <TaskContainer>
        <TaskItem
          isComplete={this.props.task.isComplete}
          onClick={this.onClick}
        >
          {this.props.task.title}
          {this.state.isOpen ? (
            <Controls>
              <Save onClick={this.onSave} />
            </Controls>
          ) : (
            <Controls>
              <Expand isOpen={this.state.isOpen} onClick={this.onExpand} />
              <Delete isHighlighted={true} onClick={this.onDelete} />
            </Controls>
          )}
        </TaskItem>
        {this.state.isOpen && (
          <TaskInfo
            task={this.props.task}
            onUpdateNotes={this.onUpdateNotes}
            notes={this.state.notes}
          />
        )}
      </TaskContainer>
    );
  }
}
