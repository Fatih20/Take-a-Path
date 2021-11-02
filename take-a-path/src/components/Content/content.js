import styled from "styled-components";
import React from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState } from '../../context/GameStateContext';

//Config
import { gameStateProperty } from "../../forDesigner/Config";

//Components
import Attribution from './attribution';
import PlayAreaContent from './playAreaContent';

const Main = styled.div`
    padding-top: 0px;
    margin: auto auto;
    max-width: 768px;

    & > * {
        text-align: center;
    }
`;

const Title = styled.h1`
    color: ${props => props.darkTheme? "white":"black"};
    font-size: 54px;
    margin-bottom: 20px;
`;

const PlayAreaContainer = styled.div`
    clip-path: inset(0 0);
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding-bottom: 6px;
`;

const PlayArea = styled.div`
    align-items: center;
    background-color: ${({ darkTheme }) => darkTheme? "#333333" : "#fff"};
    border-radius: 15px;
    box-shadow: 0px 5px 4px 1px ${({ darkTheme }) => darkTheme? "#262626" : "#d4d4d4"};
    color: ${({ darkTheme }) => darkTheme? "white" : "black"};
    display: flex;
    flex-direction: ${({ gameState }) => {
        if (gameState === "start"){
            return "row";
        } else if (gameState === "in-game"){
            return "column";
        } else if (gameState === "finished"){
            return "none";
        }
    }};
    min-height: ${({ gameState })=> {
        if (gameState === "start" || gameState === "in-game"){
            return "200px"
        } else if (gameState === "finished"){
            return "none"
        }
    }};
    letter-spacing: ${ ({ gameState })=> {
        if (gameState === "finished"){
            return "1px";
        } else {
            return "none";
        }
    }};
    line-height: ${ ({ gameState })=> {
        if (gameState === "finished"){
            return "1.5";
        } else {
            return "none";
        }
    }};
    padding: ${({ gameState })=> {
        if (gameState === "start" || gameState === "in-game"){
            return "20px 40px"
        } else if (gameState === "finished"){
            return "25px"
        }
    }};
    position: relative;
    text-align: center;
    width: 100%;
`;

function Content (){
    const gameState = useGameState();
    const darkTheme = useTheme();
    
    const titleContent = gameStateProperty[gameState].title;
    
    return(
        <Main>
            <Title darkTheme={darkTheme}>{titleContent}</Title>
            <PlayAreaContainer>
                <PlayArea darkTheme={darkTheme} gameState={gameState}>
                    <PlayAreaContent />
                </PlayArea>
            </PlayAreaContainer>
            <Attribution />
        </Main>
    )
};

export default Content;