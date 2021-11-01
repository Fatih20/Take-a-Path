import React, { useState, useEffect, useContext } from "react";

const PathTaken = React.createContext();
const SetPathTaken = React.createContext();

export function usePathTaken (){
    useContext(PathTaken);
};

export function useSetPathTaken () {
    useContext(SetPathTaken);
};

export function PathTakenProvider ({ children }){
    const[pathTaken, setPathTaken] = useState([]);

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate != undefined && pathTakenCandidate != null){
            setPathTaken(pathTakenCandidate);
        } else {
            setPathTaken({nthEvent : "0", nameOfEvent: "Start"});
        }
    });

    function appendPathTaken (newPath){
        setPathTaken(pathTaken.append(newPath));
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function setPathTaken (newPathTaken){
        setPathTaken(newPathTaken);
    }

    return (
        <PathTaken.Provider value={pathTaken}>
            <SetPathTaken.Provider value={setPathTaken}>
                {children}
            </SetPathTaken.Provider>
        </PathTaken.Provider>
    )
}