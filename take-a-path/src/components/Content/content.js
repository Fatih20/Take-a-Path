import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

//Context
import { useTheme } from '../../context/ThemeContext';
import { useGameState, useChangeGameState, useSetGameState } from '../../context/GameStateContext';
import { useShowRecap } from "../../context/ShowRecapContext";

//Config
import { gameStateProperty } from "../../forDesigner/Config";

//Components
import Attribution from './attribution';
import PlayAreaContent from './playAreaContent';

//Logic
import { generateEndStory, generateEnding } from "../../Logic/Main";
import { EventNameConversion } from "../../forDesigner/Story";

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
    const darkTheme = useTheme();

    const gameState = useGameState();
    const progressGameState = useChangeGameState();
    const setGameState = useSetGameState();

    const showRecap = useShowRecap();

    const[pathTaken, setPathTaken] = useState([{nthEvent : "0", nameOfEvent: "Start"}]);
    const [currentEvent, setCurrentEvent] = useState({});
    const endStory = useRef("");
    const ending = useRef("");
    const endingContent = useRef("");

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate !== undefined && pathTakenCandidate !== null){
            setPathTaken(pathTakenCandidate);
        }

        return;
    }, []);

    // localStorage.removeItem("PathTaken");

    useEffect(()=>{
        localStorage.removeItem("PathTaken");
    }, []);

    useEffect(() => {
        setCurrentEvent(EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent]);
    });

    useEffect(() => {
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }, [pathTaken]);

    useEffect(()=>{
        if (pathTaken.length > 1 && gameState === "start"){
            setGameState("in-game");
        }
    });

    function appendPathTaken (newPath){
        setPathTaken(prevPathTaken => prevPathTaken.concat([newPath]));
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function appendChoice (signal){
        setPathTaken((prevPathTaken) => {
            const newPathTaken = prevPathTaken;
            newPathTaken[newPathTaken.length-1].choiceMade = signal; 
            return newPathTaken;
        });
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function updatePathTaken (newPathTaken){
        setPathTaken(newPathTaken);
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function Director (signal) {
        const EventPresent = EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent];
        const nthCurrentEvent = pathTaken[pathTaken.length-1].nthEvent;
        console.log(EventPresent);
        console.log(signal);
        appendChoice(signal);
        for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
            if (signal === answerForNextEvent.trigger) {
                if (answerForNextEvent.nextEventName === "End"){
                    // console.log(pathTaken);
                    // console.log(pathTaken[pathTaken.length-1]);
                    progressGameState();
                } else {
                    appendPathTaken({nthEvent : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
                    setCurrentEvent(EventNameConversion[answerForNextEvent.nextEventName]);
                }
            }
        }
    };
    
    const titleContent = gameStateProperty[gameState].title;

    if (gameState === "finished"){
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
                <PlayArea darkTheme={darkTheme} gameState={gameState}>
                    <PlayAreaContent director={Director} currentEvent={currentEvent} endingContent={endingContent.current} pathTaken={pathTaken}/>
                </PlayArea>
            </PlayAreaContainer>
            <Attribution />
        </Main>
    )
};

export default Content;