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

    function changeGameState (newState){
        setGameState(newState);
        console.log(gameState);
        console.log("Changed");
    }

    return (
        <GameStateContext.Provider value={gameState}>
            <ChangeGameStateContext.Provider value={changeGameState}>
                {children}
            </ChangeGameStateContext.Provider>
        </GameStateContext.Provider>

    );
}