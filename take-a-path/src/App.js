import './App.css';
import React from "react";
import styled from 'styled-components';

import { ThemeProvider } from './context/ThemeContext';
import { GameStateProvider } from './context/GameStateContext';
import { ShowRecapProvider } from './context/ShowRecapContext';

import Wrapper from './components/Wrapper';


const Main = styled.div`
`;

function App() {
  return (
    <Main>
      <GameStateProvider>
        <ThemeProvider>
          <ShowRecapProvider> 
            <Wrapper />
          </ShowRecapProvider>
        </ThemeProvider>
      </GameStateProvider>
    </Main>
    
  );
}

export default App;
