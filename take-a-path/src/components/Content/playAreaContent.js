import styled from "styled-components";
import React from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState } from '../../context/GameStateContext';

//Config
import { buttonMessage } from '../../forDesigner/Config';

//Styles
import { Button } from "../GlobalComponent";

const StartButton = styled(Button)`
    border-radius: 7px;
    margin: 0 auto;
    padding: 10px;

    & p {
        font-size: 32px;
        font-weight: 500;
    }

    @media (max-width: 820px) {
        & p {
            font-size: 28px;
        }
    }
    
    @media (max-width: 520px) {
        & p {
            font-size: 24px;
        }
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

    @media (max-width: 520px) {
        flex-direction: column;
        font-size: 18px;
        max-width: 300px;
    }
`;

const Choice = styled(Button)`
    border-radius: 7px;
    display: inline-block;
    margin-bottom: 25px;
    padding: 10px;

    @media (max-width: 520px) {
        margin-bottom: 20px;
        padding: 7px;

        &:last-child{
            margin-bottom: 23px;
        }
    }
`;

const Occurence = styled.p`
    font-size: 24px;
    margin-bottom: 12px;
`;

const Question = styled.p`
    font-size: 20px;
`;

const EndGame = styled.p`
    font-size: 20px;
    text-align: left;

    @media (max-width: 425px) {
        font-size: 20px;
    }
`;

function PlayAreaContent({ director, currentEvent, endingContent, pathTaken, startGame }){
    const darkTheme = useTheme();

    const gameState = useGameState();
    const progressGameState = useChangeGameState();

    function choiceMaker (choice){
        return <Choice href="#" key={choice.id} darkTheme={darkTheme} onClick={()=> director(choice.id)}>{choice.answer}</Choice>;
    };

    if (gameState === "start"){
        return(
            <StartButton darkTheme={darkTheme} href="#" onClick={startGame}>
                <p>{buttonMessage.start}</p>
            </StartButton>
        )
    } else if (gameState === "in-game") {
        return(
            <>
            <div>
                <Occurence>{currentEvent.Occurence}</Occurence>
                <Question>{currentEvent.Question}</Question>
            </div>
            <ChoiceContainer>
                {currentEvent.visibleChoiceGenerator(pathTaken).map(choiceMaker)}
            </ChoiceContainer>
            </>
        )
    } else if (gameState === "finished"){
        return (
            <EndGame>{endingContent}</EndGame>
        )
    }
}

export default PlayAreaContent;