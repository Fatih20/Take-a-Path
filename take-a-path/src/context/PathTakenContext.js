import React, { useState, useEffect, useContext } from "react";

const PathTaken = React.createContext();
const UpdatePathTaken = React.createContext();
const AppendPathTaken = React.createContext();
const AppendChoice = React.createContext();

export function usePathTaken (){
    return useContext(PathTaken);
};

export function useUpdatePathTaken () {
    return useContext(UpdatePathTaken);
};

export function useAppendPathTaken () {
    return useContext(AppendPathTaken);
};

export function useAppendChoice (){
    return useContext(AppendChoice);
}

export function PathTakenProvider ({ children }){
    const[pathTaken, setPathTaken] = useState([{nthEvent : "0", nameOfEvent: "Start"}]);

    useEffect (() => {
        const pathTakenCandidate = JSON.parse(localStorage.getItem("PathTaken"))
        if (pathTakenCandidate !== undefined && pathTakenCandidate !== null){
            setPathTaken(pathTakenCandidate);
        }

        return;
    }, []);

    // useEffect(() => {
    //     localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    // }, [pathTaken]);

    function appendPathTaken (newPath){
        setPathTaken(prevPathTaken => prevPathTaken.concat([newPath]));
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function appendChoice (signal){
        setPathTaken((prevPathTaken) => {
            const newPathTaken = prevPathTaken;
            newPathTaken[newPathTaken.length-1].choiceMade = signal; 
            return newPathTaken;
        });
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    function updatePathTaken (newPathTaken){
        setPathTaken(newPathTaken);
        localStorage.setItem("PathTaken", JSON.stringify(pathTaken));
    }

    // console.log(pathTaken);

    return (
        <PathTaken.Provider value={pathTaken}>
            <UpdatePathTaken.Provider value={updatePathTaken}>
                <AppendPathTaken.Provider value={appendPathTaken}>
                    <AppendChoice.Provider value={appendChoice}>
                        {children}
                    </AppendChoice.Provider>
                </AppendPathTaken.Provider>
            </UpdatePathTaken.Provider>
        </PathTaken.Provider>
    )
}