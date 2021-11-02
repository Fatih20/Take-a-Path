import styled from "styled-components";
import React, { useEffect } from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState, useSetGameState } from '../../context/GameStateContext';
import { usePathTaken, useUpdatePathTaken } from "../../context/PathTakenContext";

//Config
import { buttonMessage } from '../../forDesigner/Config';

//Styles
import { Button } from "../GlobalComponent";

//Game Logic
import { Director } from "../../Logic/Main";
import { EventNameConversion } from "../../forDesigner/Story";

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

const Choice = styled(Button)`
    border-radius: 7px;
    display: inline-block;
    margin-bottom: 25px;
    padding: 10px;
`;

const Occurence = styled.p`
    font-size: 24px;
    margin-bottom: 12px;
`;

const Question = styled.p`
    font-size: 20px;
`;

function PlayAreaContent(){
    const darkTheme = useTheme();
    const gameState = useGameState();
    const progressGameState = useChangeGameState();
    const pathTaken = usePathTaken();
    const updatePathTaken = useUpdatePathTaken();
    const setGameState = useSetGameState();

    const currentEvent = EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent];
    const choiceShown = currentEvent.visibleChoiceGenerator(pathTaken);

    useEffect(()=>{
        if (pathTaken.length > 1){
            if (pathTaken[pathTaken.length-1].nameOfEvent === "End"){
                setGameState("finished");
            } else {
                setGameState("in-game");
            }
        }
    }, [pathTaken]);

    function choiceMaker (choice){
        console.log(choice.id);
        const choiceObject = <Choice key={choice.id} darkTheme={darkTheme} OnClick={()=> {
            console.log("Click");
            updatePathTaken(Director(pathTaken, choice.id));
            }}>{choice.answer}</Choice>;
        console.log(choiceObject);
        return choiceObject;
    };

    if (gameState === "start"){
        return(
            <StartButton darkTheme={darkTheme} href="#" onClick={() => {
                updatePathTaken(Director(pathTaken, "A"));
                console.log(pathTaken);
                console.log(gameState);
                }}>
                <p>{buttonMessage.start}</p>
            </StartButton>
        )
    } else {
        return(
            <>
            <div>
                <Occurence>{currentEvent.Occurence}</Occurence>
                <Question>{currentEvent.Question}</Question>
            </div>
            <ChoiceContainer>
                {choiceShown.map(choiceMaker)}
            </ChoiceContainer>
            </>
        )
    }
}

export default PlayAreaContent;