import styled from "styled-components";
import React from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState } from '../../context/GameStateContext';

import { attributionList, gameStateProperty } from "../../forDesigner/Config";

const Main = styled.div`
    display: ${(props) => {
        if (gameStateProperty[props.gameState].displayAttribution){
            return "block";
        } else {
            return "none";
        }}};
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
        <Main darkTheme={darkTheme} gameState={gameState}>
            {attributionList.map(function(attribution){
                return <h2 key={attributionList.indexOf(attribution)}>{attribution.text} <a href={attribution.link}>{attribution.linked_text}</a></h2>
            })}
        </Main>
    )
};

export default Attribution;

