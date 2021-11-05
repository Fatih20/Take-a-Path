import styled, { createGlobalStyle } from "styled-components";

export const GlobalTransition = createGlobalStyle`
    * {
        transition: color 0.25s, background-color 0.25s, box-shadow 0.25s, font-size 0.25s;
    }
`;

export const Button = styled.a`
    background-color: ${props => props.darkTheme? "#7239b3" : "#a56de2"};
    box-shadow: 0px 3px 3px 0px ${props => props.darkTheme? "#291650" : "#9856dc"};
    color: white;

    &:hover{
        background-color: #b07fe6;
    }
`;