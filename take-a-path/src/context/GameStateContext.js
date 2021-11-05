import React, { useState, useContext, useEffect } from "react";

//Context
import { usePathTaken } from "./PathTakenContext";

const GameStateContext = React.createContext();
const ChangeGameStateContext = React.createContext();
const SetGameStateContext = React.createContext();

export function useGameState(){
    return useContext(GameStateContext)
}

export function useChangeGameState(){
    return useContext(ChangeGameStateContext)
}

export function useSetGameState(){
    return useContext(SetGameStateContext)
}

export function GameStateProvider( { children }){
    const[gameState, setGameState] = useState("start");

    const possibleGameState = ["start", "in-game", "finished"];

    useEffect (() => {
        const gameStateCandidate = JSON.parse(localStorage.getItem("GameState"))
        if (gameStateCandidate !== undefined && gameStateCandidate !== null){
            if (gameStateCandidate !== "finished"){
                setGameState(gameStateCandidate);
            }
        }
        return;
    }, []);

    useEffect(()=>{
        localStorage.setItem("GameState", JSON.stringify(gameState));
    }, [gameState]);


    function progressGameState (){
        const newState = possibleGameState[((possibleGameState.indexOf(gameState) + 1) % possibleGameState.length)];
        setGameState(newState);
    }

    return (
        <GameStateContext.Provider value={gameState}>
            <ChangeGameStateContext.Provider value={progressGameState}>
                <SetGameStateContext.Provider value={setGameState}>
                    {children}
                </SetGameStateContext.Provider>
            </ChangeGameStateContext.Provider>
        </GameStateContext.Provider>

    );
}