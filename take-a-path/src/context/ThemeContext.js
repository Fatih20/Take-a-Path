import React, { useState, useContext } from "react";

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

    function toggleTheme (){
        setDarkTheme(!darkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ChangeThemeContext.Provider value={toggleTheme}>
                {children}
            </ChangeThemeContext.Provider>
        </ThemeContext.Provider>

    );
}