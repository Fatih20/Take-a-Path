import React, { useState, useContext } from "react";

const ShowRecapContext = React.createContext();
const ChangeShowRecapContext = React.createContext();

export function useShowRecap (){
    return useContext(ShowRecapContext)
};

export function useChangeShowRecap (){
    return useContext(ChangeShowRecapContext)
}

export function ShowRecapProvider({ children }){
    const[showRecap, setShowRecap] = useState(true);

    function toggleShowRecap (){
        setShowRecap(!showRecap);
    }

    return (
        <ShowRecapContext.Provider value={showRecap}>
            <ChangeShowRecapContext.Provider value={toggleShowRecap}>
                {children}
            </ChangeShowRecapContext.Provider>
        </ShowRecapContext.Provider>
    )
};
