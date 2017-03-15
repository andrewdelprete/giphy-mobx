import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
  cursor: pointer;
  border-radius: 3px;
  border: 2px solid palevioletred;
  font-size: 1em;
  margin: 1rem;
  padding: 0.25em 1em;
`;

export default Button;