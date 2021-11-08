import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState, useSetGameState } from '../../context/GameStateContext';
import { useShowRecap } from "../../context/ShowRecapContext";

//Config
import { gameStateProperty, buttonMessage, animation } from "../../forDesigner/Config";

//Components
import Attribution from './attribution';
import AnimatedPlayArea from "./animatedPlayArea";

//Logic
import { generateEndStory, generateEnding } from "../../Logic/Main";
import { EventNameConversion } from "../../forDesigner/Story";

//Styles
import { Button } from "../GlobalComponent";

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

    @media (max-width: 820px) {
        font-size: 48px;
    }

    @media (max-width: 520px) {
        font-size: 40px;
    }
`;

const PlayAreaContainer = styled.div`
    clip-path: inset(0 0);
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding-bottom: 6px;
`;

const ReplayButton = styled(Button)`
    border-radius: 7px;
    display:${({gameState}) => {
        if (gameState === "start" || gameState === "in-game"){
            return "none";
        } else if (gameState === "finished"){
            return "inline-block";
        }
    }};
    margin: 0 auto;
    padding: 10px;

    & p {
        font-size: 20px;
        font-weight: 500;
    }
`;

function Content (){
    const darkTheme = useTheme();

    const gameState = useGameState();
    const progressGameState = useChangeGameState();
    const setGameState = useSetGameState();

    const showRecap = useShowRecap();

    const initialPathTaken = [{nthEvent : "0", nameOfEvent: "Start"}];

    const[pathTaken, setPathTaken] = useState(initialPathTaken);

    const[previousPathTaken, setPreviousPathTaken] = useState(initialPathTaken);
    const[playAreaProperty, setPlayAreaProperty] = useState({current : { position : "current", visible : true}, coming : { position : "current", visible : false}});
    const previousGameState = useRef(gameState);

    const endStory = useRef("");
    const ending = useRef("");
    const endingContent = useRef("");

    localStorage.removeItem("PathTaken");

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate !== undefined && pathTakenCandidate !== null){
            setPathTaken(pathTakenCandidate);
        }
        return;
    }, []);

    useEffect(() => {
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }, [pathTaken]);

    function appendPathTaken (newPath){
        setPathTaken(prevPathTaken => prevPathTaken.concat([newPath]));
    }

    function appendChoice (signal){
        setPathTaken((prevPathTaken) => {
            const newPathTaken = prevPathTaken;
            newPathTaken[newPathTaken.length-1].choiceMade = signal; 
            return newPathTaken;
        });
    }

    function updatePathTaken (newPathTaken){
        setPathTaken(newPathTaken);
    }

    function getLatestEvent(pathTaken){
        return EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent]
    }

    function Director (signal) {
        const EventPresent = getLatestEvent(pathTaken);
        const nthCurrentEvent = pathTaken[pathTaken.length-1].nthEvent;
        setPreviousPathTaken(pathTaken);
        appendChoice(signal);
        for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
            if (signal === answerForNextEvent.trigger) {
                if (answerForNextEvent.nextEventName === "End"){
                    progressGameState();
                    previousGameState.current = "finished";
                    // setPreviousGameState("finished");
                } else {
                    appendPathTaken({nthEvent : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
                }
            }
        }
    };

    function synchronize(){
        // setPreviousGameState(gameState);
        previousGameState.current = gameState;
        setPreviousPathTaken(pathTaken);
    }

    function restart(){
        localStorage.removeItem("PathTaken");
        setPathTaken(initialPathTaken);
        setPreviousPathTaken(initialPathTaken);
        progressGameState();
        previousGameState.current = "start";
        // setPreviousGameState("start");
    };

    function startGame (){
        Director("A");
        previousGameState.current = progressGameState(true)
        // setPreviousGameState(progressGameState(true));
        // console.log(previousGameState);
    };
    
    const titleContent = gameStateProperty[gameState].title;

    if (gameState === "finished"){
        localStorage.removeItem("PathTaken");
        endStory.current = generateEndStory(pathTaken);
        ending.current = generateEnding(pathTaken);   
    }

    if (showRecap){
        endingContent.current = endStory.current;
    } else {
        endingContent.current = ending.current;
    }
    
    return(
        <Main>
            <Title darkTheme={darkTheme}>{titleContent}</Title>
            <PlayAreaContainer>
                <AnimatedPlayArea pathTaken={pathTaken} previousPathTaken={previousPathTaken} synchronize={synchronize} getLatestEvent={getLatestEvent} director={Director} gameState={gameState} previousGameState={previousGameState.current} startGame={startGame} endingContent={endingContent}/>
            </PlayAreaContainer>
            <div>
                <ReplayButton href="#" gameState={gameState} darkTheme={darkTheme} onClick={restart}><p>{buttonMessage.replay}</p></ReplayButton>
            </div>
            <Attribution />
        </Main>
    )
};

export default Content;