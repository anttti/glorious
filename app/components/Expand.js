import React from 'react';
import styled from 'styled-components';

const Expand = styled.div`
  margin-right: 10px;
  position: relative;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }
`;

export default ({ isHighlighted, onClick }) => {
  return (
    <Expand isHighlighted={isHighlighted} onClick={onClick}>
      <i className="fas fa-plus-circle" />
    </Expand>
  );
};
