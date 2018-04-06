import styled from 'styled-components';

export default styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  background: ${props => (props.isHighlighted ? '#f0f4f4' : 'transparent')};
  font-weight: ${props => (props.isHighlighted ? 'bold' : 'normal')};
  cursor: pointer;
  -webkit-user-select: none;

  &:hover {
    background: #f0f4f4;
  }
`;
