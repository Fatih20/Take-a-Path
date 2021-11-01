import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useTheme } from '../../ThemeContext';
import { useGameState } from '../../GameStateContext';

import Attribution from './attribution';
import PlayArea from './playArea';

const Main = styled.div`
    padding-top: 0px;
    margin: auto auto;
    max-width: 768px;

    & > * {
        text-align: center;
    }
`;

const Title = styled.h1`
    color: ${props => props.darkTheme? "white":"black"};
    font-size: 54px;
    margin-bottom: 20px;
`;

function Content (){
    const gameState = useGameState();
    const darkTheme = useTheme();
    
    let titleContent;
    if (gameState == "start"){
        titleContent = "Start your Adventure";
    } else if (gameState == "in-game") {
        titleContent = "Start your Adventure";
    } else if (gameState == "finished"){
        titleContent = "The path you've taken";
    }

    console.log(titleContent);
    
    
    return(
        <Main>
            <Title darkTheme={darkTheme}>{titleContent}</Title>
            <PlayArea></PlayArea>
            <Attribution />
        </Main>
    )
};

export default Content;