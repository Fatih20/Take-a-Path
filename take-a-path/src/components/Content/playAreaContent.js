import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState, useSetGameState } from '../../context/GameStateContext';
import { usePathTaken, useUpdatePathTaken } from "../../context/PathTakenContext";
import { useShowRecap } from "../../context/ShowRecapContext";

//Config
import { buttonMessage } from '../../forDesigner/Config';

//Styles
import { Button } from "../GlobalComponent";

//Game Logic
import { Director, generateEndStory, generateEnding } from "../../Logic/Main";
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
    const showRecap = useShowRecap();

    const [currentEvent, setCurrentEvent] = useState({});
    const endStory = useRef("");
    const ending = useRef("");

    useEffect(()=>{
        console.log("Bruh");
        if (pathTaken.length > 1){
            if (pathTaken[pathTaken.length-1].nameOfEvent === "End"){
                setGameState("finished");
            } else {
                setGameState("in-game");
            }
        }
    }, [pathTaken]);

    useEffect (()=> {
        if (currentEvent === "End"){
            endStory.current = generateEndStory(pathTaken);
            ending.current = generateEnding(pathTaken);
            progressGameState();
        }

        return;
    }, [currentEvent])

    function progressThroughChoice (id){
        updatePathTaken(Director(pathTaken, id));
        setCurrentEvent(EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent]);
    }

    function startGame (){
        progressThroughChoice("A");
        progressGameState();
    };

    function choiceMaker (choice){
        return <Choice key={choice.id} darkTheme={darkTheme} onClick={()=> {
            // updatePathTaken(Director(pathTaken, choice.id));
            // setCurrentEvent(EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent]);
            // console.log(currentEvent);
            progressThroughChoice(choice.id);
            }}>{choice.answer}</Choice>;
    };

    if (gameState === "start"){
        return(
            <StartButton darkTheme={darkTheme} href="#" onClick={() => {
                startGame();
                }
                }>
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
        if (showRecap){
            return (
                <p>{endStory}</p>
            )
        } else {
            return (
                <p>{ending}</p>
            )
        }
    }
}

export default PlayAreaContent;