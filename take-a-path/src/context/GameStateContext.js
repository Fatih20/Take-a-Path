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
    const pathTaken = usePathTaken();

    const possibleGameState = ["start", "in-game", "finished"];

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