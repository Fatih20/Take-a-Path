import styled, { css } from "styled-components";
import React, { useState, useEffect, useRef } from "react";

import { useTheme } from '../../context/ThemeContext';

import { animation } from "../../forDesigner/Config";

import PlayAreaContent from './playAreaContent';

const PlayAreaStart = css`
    flex-direction: row;
    min-height: 200px;
    padding: 20px 40px;

    @media (max-width: 820px) {
        padding: 20px 10px;
    }

    @media (max-width: 520px) {
        padding-bottom: 0;
    }
`;

const PlayAreaGame = css`
    flex-direction: column;
    min-height: 200px;
    padding: 20px 40px;

    @media (max-width: 820px) {
        padding: 20px 10px;
    }

    @media (max-width: 520px) {
        padding-bottom: 0;
    }
`;

const PlayAreaEnd = css`
    letter-spacing: 1px;
    line-height: 1.5;
    padding: 25px;

    @media (max-width: 820px) {
        padding: 20px;
    }

    @media (max-width: 425px) {
        line-height: 1.65;
        padding: 7px 10px;
    }
`;

const PlayArea = styled.div`
    align-items: center;
    background-color: ${({ darkTheme }) => darkTheme? "#333333" : "#fff"};
    border-radius: 15px;
    box-shadow: 0px 5px 4px 1px ${({ darkTheme }) => darkTheme? "#262626" : "#d4d4d4"};
    color: ${({ darkTheme }) => darkTheme? "white" : "black"};
    display: ${({ visible }) => {
        if (visible){
            return "flex";
        } else {
            return "none";
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
    position: relative;
    text-align: center;
    width: 100%;

    ${({ gameState }) => {
        if (gameState === "start"){
            return PlayAreaStart;
        } else if (gameState === "in-game"){
            return PlayAreaGame;
        } else if (gameState === "finished"){
            return PlayAreaEnd;
        }
    }};

    @media (max-width: 425px) {
        border-radius: 10px;
    }
`;

function AnimatedPlayArea ({ pathTaken, previousPathTaken, synchronize, getLatestEvent, director, gameState, previousGameState, startGame, endingContent }){
    const darkTheme = useTheme();

    const possiblePlayAreaProperty = {
        default : {current : { position : "current", visible : true}, coming : { position : "coming", visible : false}},
        exiting : {current : { position : "passing", visible : true}, coming : { position : "coming", visible : false}},
        exitingToEntering : {current : { position : "passing", visible : false}, coming : { position : "coming", visible : true}},
        entering : {current : { position : "current", visible : false}, coming : { position : "current", visible : true}},
    };

    const playAreaProperty = useRef(possiblePlayAreaProperty.default);
    const[someState, setSomeState] = useState(true);

    console.log("Bruh original");

    // useEffect(()=>{
    //     if (JSON.stringify(playAreaProperty) === JSON.stringify(possiblePlayAreaProperty.exiting)) {
    //         setTimeout(()=>{
    //             setPlayAreaProperty(possiblePlayAreaProperty.entering);
    //         }, animation.outDuration)
    //     }
    // }, [playAreaProperty]);

    // useEffect(()=>{
    //     if (JSON.stringify(playAreaProperty) === JSON.stringify(possiblePlayAreaProperty.entering)) {
    //         setTimeout(()=>{
    //             setPlayAreaProperty(possiblePlayAreaProperty.default);
    //         }, animation.inDuration+animation.outDuration)
    //     }
    // }, [playAreaProperty]);

    // function animating (){
    //     setPlayAreaProperty(possiblePlayAreaProperty.exiting);
    //         // playAreaProperty.current = possiblePlayAreaProperty.exiting;
    //         console.log("Bruh 2");
    //         setTimeout(()=>{
    //             setPlayAreaProperty(possiblePlayAreaProperty.entering);
    //             // playAreaProperty.current = possiblePlayAreaProperty.exitingToEntering;
    //             // playAreaProperty.current = possiblePlayAreaProperty.entering;
    //             setTimeout(()=>{
    //                 synchronize();
    //                 setPlayAreaProperty(possiblePlayAreaProperty.default);
    //                 // playAreaProperty.current = possiblePlayAreaProperty.default;
    //                 console.log("Bruh 4");
    //             }, animation.inDuration);
    //             console.log("Bruh 3");   
    //         }, animation.outDuration);
    // };

    if (animation.useAnimation){
        // console.log("Bruh");
        if (previousPathTaken !== pathTaken){
            // setPlayAreaProperty(possiblePlayAreaProperty.exiting);
            playAreaProperty.current = possiblePlayAreaProperty.exiting;
            // console.log("Bruh 2");
            setTimeout(()=>{
                // setPlayAreaProperty(possiblePlayAreaProperty.entering);
                // playAreaProperty.current = possiblePlayAreaProperty.exitingToEntering;
                playAreaProperty.current = possiblePlayAreaProperty.entering;
                console.log("Entering");
                setSomeState(prevSomeState => !prevSomeState);
                setTimeout(()=>{
                    synchronize();
                    // setPlayAreaProperty(possiblePlayAreaProperty.default);
                    playAreaProperty.current = possiblePlayAreaProperty.default;
                    setSomeState(prevSomeState => !prevSomeState);
                    // console.log("Bruh 4");
                }, animation.inDuration);
                // console.log("Bruh 3");   
            }, animation.outDuration);
        }
        // console.log("Bruh After");
        return (
            <>
            <PlayArea position={playAreaProperty.current.current.position} darkTheme={darkTheme} gameState={previousGameState} visible={playAreaProperty.current.current.visible} style={{ transition: `left ${animation.outDuration/1000}s`}}>
                <PlayAreaContent director={director} currentEvent={getLatestEvent(previousPathTaken)} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame} gameState={previousGameState}/>
                <p>Current</p>
            </PlayArea>
            <PlayArea position={playAreaProperty.current.coming.position} darkTheme={darkTheme} gameState={gameState} visible={playAreaProperty.current.coming.visible} style={{ transition: `left ${animation.inDuration/1000}s`}}>
                <PlayAreaContent director={director} currentEvent={getLatestEvent(pathTaken)} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame} gameState={gameState}/>
                <p>Coming</p>
            </PlayArea>
            </>
        ) 
    } else {
        return (
            <PlayArea position={"current"} darkTheme={darkTheme} gameState={gameState} visible={true}>
                <PlayAreaContent director={director} currentEvent={getLatestEvent(pathTaken)} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame} gameState={gameState}/>
            </PlayArea>
        )
    }
};

export default AnimatedPlayArea;