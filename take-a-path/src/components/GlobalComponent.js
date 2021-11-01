import styled from "styled-components";

export const Button = styled.a`
    background-color: ${props => props.darkTheme? "#7239b3" : "#a56de2"};
    box-shadow: 0px 3px 3px 0px ${props => props.darkTheme? "#291650" : "#9856dc"};
    color: white;

    &:hover{
        background-color: #b07fe6;
    }
`;