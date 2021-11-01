import styled from "styled-components";
import React, { useState } from "react";
import { useTheme, useToggleTheme } from '../../ThemeContext';
import { useGameState, useChangeGameState } from '../../GameStateContext';

const Main = styled.div`
    display: flex;
    flex-direction: row;
    margin: 30px 0px;
    text-align: right;

    & > * {
        margin-right: 30px;
    }

    & > *:first-child {
        margin-right: 0px;
    }

`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const ThemeToggle = styled.div`
    display: inline-block;
    transition: all 0.25s;

    & i {
        color: ${props => props.darkTheme? "#666" : "#abacae"};
        font-size: ${props => props.darkTheme? "36px" : "46px"};
    }

    & i:hover{
        color: ${props => props.darkTheme? "#fff394" : "#f9c440"};
    }
`;

const EndingOptionButton = styled.a`
    background-color: ${props => props.darkTheme? "#666" : "#abacae"};
    border-radius: 5px;
    box-shadow: 0px 3px 3px 0px ${props => props.darkTheme? "#333333" : "#d4d4d4"};
    color: ${props => props.darkTheme? "#1a1a1a" : "#f7f7f7"};
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
`;

const EndingOptionButtonContainer = styled.div`
    display : ${(props) => {
        if (props.gameState == "finished"){
            return "flex";
        } else {
            return "none";
        }
    }};
    flex-direction: column;
`;

function Header (){
    const[showRecap, setShowRecap] = useState(true);
    const darkTheme = useTheme();
    const toggleTheme = useToggleTheme();
    const gameState = useGameState();
    const changeGameState = useChangeGameState();

    let themeToggleIcon;
    if (darkTheme){
        themeToggleIcon = "moon";
    } else {
        themeToggleIcon = "sun";
    }

    let endingOptionButtonContent;
    if (showRecap){
        endingOptionButtonContent = "Show me just the ending";
    } else {
        endingOptionButtonContent = "Show me the story recap";
    }
    

    return(
        <Main>
            <Spacer />
            <EndingOptionButtonContainer gameState={gameState} >
                <EndingOptionButton darkTheme={darkTheme} href="#" onClick= {()=> setShowRecap(!showRecap)}>
                    {endingOptionButtonContent}
                </EndingOptionButton>
            </EndingOptionButtonContainer>
            <ThemeToggle darkTheme={darkTheme} onClick={toggleTheme}>
                <i className={`fas fa-${themeToggleIcon}`}></i>
                {/* <FontAwesomeIcon icon={["fas", themeToggleIcon]} /> */}
            </ThemeToggle>

        </Main>
    )
};

export default Header;