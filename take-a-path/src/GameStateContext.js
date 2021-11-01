import React, { useState, useContext } from "react";

const GameStateContext = React.createContext();
const ChangeGameStateContext = React.createContext();

export function useGameState(){
    return useContext(GameStateContext)
}

export function useChangeGameState(){
    return useContext(ChangeGameStateContext)
}

export function GameStateProvider( { children }){

    const[gameState, setGameState] = useState("finished");

    const possibleGameState = ["start", "in-game", "finished"];

    function progressGameState (){
        const newState = possibleGameState[((possibleGameState.indexOf(gameState) + 1) % possibleGameState.length)];
        setGameState(newState);
    }

    return (
        <GameStateContext.Provider value={gameState}>
            <ChangeGameStateContext.Provider value={progressGameState}>
                {children}
            </ChangeGameStateContext.Provider>
        </GameStateContext.Provider>

    );
}