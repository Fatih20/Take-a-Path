import styled from "styled-components";
import React from "react";
import { useTheme } from '../../ThemeContext';
import { useGameState, progressGameState  } from '../../GameStateContext';

const Main = styled.div`
    
`;

function PlayArea(){
    const darkTheme = useTheme();
    const gameState = useGameState();

    return(
        <Main>

        </Main>
    )
}

export default PlayArea;