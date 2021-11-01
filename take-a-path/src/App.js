import './App.css';
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { ThemeProvider } from './ThemeContext';
import { GameStateProvider } from './GameStateContext';
import Content from './components/Content/content';
import Header from './components/Header/header';
import Wrapper from './components/Wrapper';

const Main = styled.div`
`;

export const ThemeContext = React.createContext();

function App() {
  return (
    <Main>
      <GameStateProvider>
        <ThemeProvider> 
          <Wrapper />
        </ThemeProvider>
      </GameStateProvider>
    </Main>
    
  );
}

export default App;
