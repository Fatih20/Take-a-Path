import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState, useSetGameState } from '../../context/GameStateContext';
import { usePathTaken, useUpdatePathTaken, useAppendPathTaken, useAppendChoice } from "../../context/PathTakenContext";
import { useShowRecap } from "../../context/ShowRecapContext";

//Config
import { buttonMessage } from '../../forDesigner/Config';

//Styles
import { Button } from "../GlobalComponent";

//Game Logic
import { Director, generateEndStory, generateEnding } from "../../Logic/Main";
import { EventNameConversion } from "../../forDesigner/Story";

//Hooks
import { endText } from './endText';

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
    const setGameState = useSetGameState();

    const pathTaken = usePathTaken();
    const updatePathTaken = useUpdatePathTaken();
    const appendPathTaken = useAppendPathTaken();
    const appendChoice = useAppendChoice();

    const showRecap = useShowRecap();

    const [currentEvent, setCurrentEvent] = useState({});
    const endStory = useRef("");
    const ending = useRef("");

    // useEffect(()=>{
    //     console.log("Bruh");
    //     if (pathTaken.length > 1){
    //         if (pathTaken[pathTaken.length-1].nameOfEvent === "End"){
    //             setGameState("finished");
    //         } else {
    //             setGameState("in-game");
    //         }
    //     }
    // }, [pathTaken]);

    // useEffect (()=> {
    //     console.log("Bruh");
    //     if (currentEvent === "End"){
    //         endStory.current = generateEndStory(pathTaken);
    //         ending.current = generateEnding(pathTaken);
    //         progressGameState();
    //     }

    //     return;
    // }, [currentEvent])

    function Director (signal) {
        const EventPresent = EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent];
        const nthCurrentEvent = pathTaken[pathTaken.length-1].nthEvent;
        console.log(EventPresent);
        console.log(signal);
        appendChoice(signal);
        for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
            if (signal === answerForNextEvent.trigger) {
                if (answerForNextEvent.nextEventName === "End"){
                    console.log(pathTaken);
                    console.log(pathTaken[pathTaken.length-1]);
                    endStory.current = generateEndStory(pathTaken);
                    ending.current = generateEnding(pathTaken);
                    progressGameState();
                } else {
                    appendPathTaken({nthEvent : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
                    setCurrentEvent(EventNameConversion[answerForNextEvent.nextEventName]);
                }
            }
        }
    };

    function startGame (){
        // Director("A");
        progressGameState();
    };

    function choiceMaker (choice){
        return <Choice key={choice.id} darkTheme={darkTheme} onClick={()=> Director(choice.id)}>{choice.answer}</Choice>;
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
            // <p>Bruh</p>
        )
    } else if (gameState === "finished"){
        return (
            <endText typeOfEnd={()=> {
                if (showRecap){
                    return endStory;
                } else {
                    return ending;
                }}} />

        )
    }
}

export default PlayAreaContent;