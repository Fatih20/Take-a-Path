import styled from "styled-components";
import React from "react";
import { useTheme } from '../../ThemeContext';
import { useGameState } from '../../GameStateContext';

import { attributionList } from "../../config";

const Main = styled.div`
    margin-top: 20px;

    & h2 {
        color : ${props => props.darkTheme? "#666" : "#abacae"};
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 5px;
    }

    & a {
        color : ${props => props.darkTheme? "#666" : "#abacae"};
    }

    & a:hover{
        color: #7e8087;
    }
`;

function Attribution () {
    const darkTheme = useTheme();
    const gameState = useGameState();

    return (
        <Main darkTheme={darkTheme}>
            {attributionList.map(function(attribution){
                return <h2>{attribution.text} <a href={attribution.link}>{attribution.linked_text}</a></h2>
            })}
        </Main>
    )
};

export default Attribution;

