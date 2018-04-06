import React from 'react';
import styled from 'styled-components';

const Delete = styled.div`
  display: ${props => (props.isHighlighted ? 'block' : 'none')};
  position: relative;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }
`;

export default ({ isHighlighted, onClick }) => {
  return (
    <Delete isHighlighted={isHighlighted} onClick={onClick}>
      <i className="fas fa-times-circle" />
    </Delete>
  );
};
