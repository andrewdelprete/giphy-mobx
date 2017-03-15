import styled from 'styled-components';

const Gif = styled.a`
    background-size: cover;
    cursor: pointer;
    display: block;
    float: left;
    height: 20vh;
    opacity: 0.85;
    transition: all .3s;
    width: 20vw;
    &:hover {
        opacity: 1;
    }
`;

export default Gif;