import styled from "styled-components";
import React from "react";
import { useTheme, useToggleTheme } from '../../ThemeContext';
import { useGameState, progressGameState  } from '../../GameStateContext';

const Main = styled.div`
    clip-path: inset(0 0);
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding-bottom: 6px;
`;

function PlayArea(){
    return(
        <Main>

        </Main>
    )
}

export default PlayArea;