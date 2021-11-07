import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

import { useTheme } from '../../context/ThemeContext';

import { animation } from "../../forDesigner/Config";

import PlayAreaContent from './playAreaContent';

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
    transition: transform ${({ position }) => {
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

function AnimatedPlayArea ({ pathTaken, previousPathTaken, synchronize, getLatestEvent, director, gameState, previousGameState, startGame, endingContent }){
    const darkTheme = useTheme();

    const playAreaProperty = useRef({current : { position : "current", visible : true}, coming : { position : "current", visible : false}});

    // console.log("Bruh original");

    if (animation.useAnimation){
        console.log("Bruh");
        if (previousPathTaken !== pathTaken){
            if (JSON.stringify(playAreaProperty.current) !== JSON.stringify({current : { position : "passing", visible : true}, coming : { position : "coming", visible : false}})){
                playAreaProperty.current = {current : { position : "passing", visible : true}, coming : { position : "coming", visible : false}};
                console.log("Bruh Special");
            }
            console.log("Bruh 2");
            setTimeout(()=>{
                playAreaProperty.current = {current : { position : "passing", visible : false}, coming : { position : "current", visible : true}};
                setTimeout(()=>{
                    synchronize();
                    playAreaProperty.current = {current : { position : "current", visible : true}, coming : { position : "coming", visible : false}};
                }, animation.outDuration)
                console.log("Bruh3");   
            }, animation.inDuration);
        }
        return (
            <>
            <PlayArea position={playAreaProperty.current.current.position} darkTheme={darkTheme} gameState={previousGameState} visible={playAreaProperty.current.current.visible} style={{ transition: `transform ${animation.outDuration/1000}s`}}>
                <PlayAreaContent director={director} currentEvent={getLatestEvent(previousPathTaken)} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame} gameState={previousGameState}/>
            </PlayArea>
            <PlayArea position={playAreaProperty.current.coming.position} darkTheme={darkTheme} gameState={gameState} visible={playAreaProperty.current.coming.visible} style={{ transition: `transform ${animation.inDuration/1000}s`}}>
                <PlayAreaContent director={director} currentEvent={getLatestEvent(pathTaken)} endingContent={endingContent.current} pathTaken={pathTaken} startGame={startGame} gameState={gameState}/>
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