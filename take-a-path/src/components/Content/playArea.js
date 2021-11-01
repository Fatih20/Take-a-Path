import styled from "styled-components";
import React from "react";
import { useTheme } from '../../ThemeContext';
import { useGameState, progressGameState  } from '../../GameStateContext';

const Main = styled.div`
    align-items: center;
    border-radius: 15px;
    display: flex;
    flex-direction: ${({ gameState }) => {
        if (gameState == "start"){
            return "row";
        } else if (gameState == "in-game"){
            return "column";
        } else if (gameState == "finished"){
            return "none";
        }
    }};
    min-height: ${({ gameState })=> {
        if (gameState == "start" || gameState == "in-game"){
            return "200px"
        } else if (gameState == "finished"){
            return "none"
        }
    }};
    letter-spacing: ${ ({ gameState })=> {
        if (gameState == "finished"){
            return "1px";
        } else {
            return "none";
        }
    }};
    line-height: ${ ({ gameState })=> {
        if (gameState == "finished"){
            return "1.5";
        } else {
            return "none";
        }
    }};
    padding: ${({ gameState })=> {
        if (gameState == "start" || gameState == "in-game"){
            return "20px 40px"
        } else if (gameState == "finished"){
            return "25px"
        }
    }};
    position: relative;
    text-align: center;
    width: 100%;
`;

function PlayArea(){
    const darkTheme = useTheme();
    const gameState = useGameState();

    return(
        <Main darkTheme={darkTheme} gameState={gameState}>

        </Main>
    )
}

export default PlayArea;