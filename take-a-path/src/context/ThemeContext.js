import React, { useState, useContext, useEffect } from "react";

const ThemeContext = React.createContext();
const ChangeThemeContext = React.createContext();

export function useTheme(){
    return useContext(ThemeContext)
}

export function useToggleTheme(){
    return useContext(ChangeThemeContext)
}

export function ThemeProvider( { children }){
    const[darkTheme, setDarkTheme] = useState(true);

    useEffect(()=>{
        const darkThemeCandidate = JSON.parse(localStorage.getItem("DarkTheme"));
        console.log(darkThemeCandidate);
        if (darkThemeCandidate !== undefined && darkThemeCandidate !== null){
            setDarkTheme(darkThemeCandidate);
        }
        return;
    }, [])

    function toggleTheme (){
        setDarkTheme(!darkTheme);
        localStorage.setItem("DarkTheme", JSON.stringify(!darkTheme));
    };

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ChangeThemeContext.Provider value={toggleTheme}>
                {children}
            </ChangeThemeContext.Provider>
        </ThemeContext.Provider>

    );
}