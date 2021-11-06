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
import PlayAreaContent from './playAreaContent';

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
    left: ${({ position }) => {
        if (position === "passing"){
            return("-101%")
        } else if (position === "current"){
            return ("0")
        } else if (position === "coming"){
            return ("101%")
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
    transition: left ${({ position }) => {
        if (position === "passing"){
            return(`${(animation.outDuration/1000).toString()}s`);
        } else if (position === "current"){
            return(`${(animation.inDuration/1000).toString()}s`);
        } else if (position === "coming"){
            return ("0s");
        }
    }};
    width: 100%;

    @media (max-width: 820px) {
        padding: ${({ gameState })=> {
            if (gameState === "start" || gameState === "in-game"){
                return "20px 10px"
            } else if (gameState === "finished"){
                return "20px"
            }
        }};
    }

    @media (max-width: 520px) {
        padding-bottom: ${({ gameState })=> {
            if (gameState === "start" || gameState === "in-game"){
                return "0px"
            }
        }};
    }

    @media (max-width: 425px) {
        border-radius: 10px;

        ${({ gameState }) => {
            if (gameState === "finished"){
                return (
                    "letter-spacing: 1px;\nline-height: 1.65;\npadding: 7px 10px;"
                )
            } else {
                return("")
            }
        }};

    }
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
    const [currentEvent, setCurrentEvent] = useState({});

    const endStory = useRef("");
    const ending = useRef("");
    const endingContent = useRef("");

    const previousEvent = useRef("");
    const previousGameState = useRef("");
    const positionCurrent = useRef("current");
    const positionComing = useRef("coming");

    // localStorage.removeItem("PathTaken");

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

    useEffect(() => {
        setCurrentEvent(EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent]);
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

    function Director (signal) {
        const EventPresent = EventNameConversion[pathTaken[pathTaken.length-1].nameOfEvent];
        const nthCurrentEvent = pathTaken[pathTaken.length-1].nthEvent;
        appendChoice(signal);
        for (let answerForNextEvent of EventPresent.AnswersForNextEventList){
            if (signal === answerForNextEvent.trigger) {
                if (answerForNextEvent.nextEventName === "End"){
                    previousGameState.current = progressGameState(true);
                } else {
                    appendPathTaken({nthEvent : (parseInt(nthCurrentEvent)+1).toString(), nameOfEvent : answerForNextEvent.nextEventName});
                    setCurrentEvent(EventNameConversion[answerForNextEvent.nextEventName]);
                }
            }
        }
    };

    function restart(){
        localStorage.removeItem("PathTaken");
        setPathTaken(initialPathTaken);
        progressGameState();
    };

    function startGame (){
        Director("A");
        previousGameState.current = progressGameState(true);
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
                <PlayArea darkTheme={darkTheme} gameState={gameState}>
                    <PlayAreaContent director={Director} currentEvent={currentEvent} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame}/>
                </PlayArea>
            </PlayAreaContainer>
            <div>
                <ReplayButton href="#" gameState={gameState} darkTheme={darkTheme} onClick={restart}><p>{buttonMessage.replay}</p></ReplayButton>
            </div>
            <Attribution />
        </Main>
    )
};

export default Content;