import './App.css';
import React from "react";
import styled from 'styled-components';

import { ThemeProvider } from './context/ThemeContext';
import { GameStateProvider } from './context/GameStateContext';
import { ShowRecapProvider } from './context/ShowRecapContext';
import { PathTakenpProvider } from './context/PathTakenContext';

import { GlobalTransition } from './components/GlobalComponent';

import Wrapper from './components/Wrapper';


const Main = styled.div`
`;

function App() {
  return (
    <Main>
      <GlobalTransition />
      <PathTakenpProvider>
        <GameStateProvider>
          <ThemeProvider>
            <ShowRecapProvider> 
              <Wrapper />
            </ShowRecapProvider>
          </ThemeProvider>
        </GameStateProvider>
      </PathTakenpProvider>
    </Main>
    
  );
}

export default App;
