import './App.css';
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { ThemeProvider } from './ThemeContext';
import { GameStateProvider } from './GameStateContext';
import { ShowRecapProvider } from './ShowRecapContext';

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
