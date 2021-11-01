import React, { useState, useEffect, useContext } from "react";
import PlayArea from "../components/Content/playArea";

const PathTaken = React.createContext();
const AppendPathTaken = React.createContext();

export function usePathTaken (){
    useContext(PathTaken);
};

export function useAppendPathTaken () {
    useContext(AppendPathTaken);
};

export function PathTakenProvider ({ children }){
    const[pathTaken, setPathTaken] = useState([]);

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate != undefined && pathTakenCandidate != null){
            setPathTaken(pathTakenCandidate);
        } else {
            setPathTaken({nth_event : "0", name_of_event: "Start"});
        }
    });

    function appendPathTaken (newPath){
        setPathTaken(pathTaken.append(newPath));
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    return (
        <PathTaken.Provider value={pathTaken}>
            <AppendPathTaken.Provider value={appendPathTaken}>
                {children}
            </AppendPathTaken.Provider>
        </PathTaken.Provider>
    )
}