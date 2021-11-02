import React, { useState, useEffect, useContext } from "react";

const PathTaken = React.createContext();
const UpdatePathTaken = React.createContext();

export function usePathTaken (){
    return useContext(PathTaken);
};

export function useUpdatePathTaken () {
    return useContext(UpdatePathTaken);
};

export function PathTakenProvider ({ children }){
    const[pathTaken, setPathTaken] = useState([{nthEvent : "0", nameOfEvent: "Start"}]);

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate !== undefined && pathTakenCandidate !== null){
            setPathTaken(pathTakenCandidate);
        }

        return;
    }, []);

    // function appendPathTaken (newPath){
    //     setPathTaken(pathTaken.append(newPath));
    //     localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    // }

    function updatePathTaken (newPathTaken){
        setPathTaken(newPathTaken);
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    console.log(pathTaken);

    return (
        <PathTaken.Provider value={pathTaken}>
            <UpdatePathTaken.Provider value={updatePathTaken}>
                {children}
            </UpdatePathTaken.Provider>
        </PathTaken.Provider>
    )
}