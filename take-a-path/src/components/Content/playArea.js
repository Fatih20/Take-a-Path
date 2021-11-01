import styled from "styled-components";
import React from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, progressGameState  } from '../../context/GameStateContext';
import { usePathTaken, useSetPathTaken } from "../../context/PathTakenContext";

//Config
import { buttonMessage } from '../../forDesigner/Config';

//Styles
import { Button } from "../GlobalComponent";

//External Tools
import { Director } from "../../Logic/Main";
import { EventNameConversion } from "../../forDesigner/Story";

const Main = styled.div`
    align-items: center;
    background-color: ${({ darkTheme }) => darkTheme? "#333333" : "#fff"};
    border-radius: 15px;
    box-shadow: 0px 5px 4px 1px ${({ darkTheme }) => darkTheme? "#262626" : "#d4d4d4"};
    color: ${({ darkTheme }) => darkTheme? "black" : "white"};
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

const StartButton = styled(Button)`
    border-radius: 7px;
    margin: 0 auto;
    padding: 10px;

    & p {
        font-size: 32px;
        font-weight: 500;
    }
`;

const ChoiceContainer = styled.div`
    column-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 20px;
    font-size: 20px;
    width: 100%;
`;

const Choice = styled.a`

`;

const Occurence = styled.p`
    font-size: 24px;
    margin-bottom: 12px;
`;

const Question = styled.p`
    font-size: 20px;
`;

function PlayArea(){
    const darkTheme = useTheme();
    const gameState = useGameState();
    const pathTaken = usePathTaken();
    const setPathTaken = useSetPathTaken();

    const CurrentEvent = EventNameConversion[pathTaken[pathTaken.length-1].nameofEvent];
    // const Visible

    if (gameState == "start"){
        return(
            <Main darkTheme={darkTheme} gameState={gameState}>
                <StartButton href="#" onClick={() => {
                    progressGameState()
                    setPathTaken(Director(pathTaken, "A"))

                    }}>{buttonMessage.start}</StartButton>
            </Main>
        )
    } else {
        return(
            <Main darkTheme={darkTheme} gameState={gameState}>
                <div>
                    <Occurence>{CurrentEvent.Occurence}</Occurence>
                    <Question>{CurrentEvent.Question}</Question>
                </div>
                <ChoiceContainer>

                </ChoiceContainer>
            </Main>
        )
    }
}

export default PlayArea;