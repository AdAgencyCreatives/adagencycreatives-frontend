import styled from 'styled-components';

export const Heading = styled.h1` 
text-align: center; 
color: green; 
`;

export const Content = styled.div` 
overflowY: scroll; 
height: 2500px; 
`;

export const Button = styled.div`
position: fixed;
width: max-content;
height: max-content;
left: calc(50% - 1.5rem);
bottom: 20px;
margin: 0;
padding: 0;
z-index: 1;
cursor: pointer;
color: var(--color-primary);
line-height: 0;
font-size: 3rem;
border-radius: 100%;
`
