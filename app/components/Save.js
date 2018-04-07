import React from 'react';
import styled from 'styled-components';

const Save = styled.div`
  position: relative;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }
`;

export default ({ onClick }) => {
  return (
    <Save onClick={onClick}>
      <i className="fas fa-save" />
    </Save>
  );
};
