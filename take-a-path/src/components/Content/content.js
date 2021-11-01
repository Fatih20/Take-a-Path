import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useTheme } from '../../context/ThemeContext';
import { useGameState } from '../../context/GameStateContext';

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

const PlayAreaContainer = styled.div`
    clip-path: inset(0 0);
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding-bottom: 6px;
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
            <PlayAreaContainer>
                <PlayArea />
            </PlayAreaContainer>
            <Attribution />
        </Main>
    )
};

export default Content;