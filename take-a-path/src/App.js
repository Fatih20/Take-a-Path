import './App.css';
import React, { useEffect } from "react";
import styled from 'styled-components';

//Context
import { ThemeProvider } from './context/ThemeContext';
import { GameStateProvider } from './context/GameStateContext';
import { ShowRecapProvider } from './context/ShowRecapContext';
import { PathTakenProvider } from './context/PathTakenContext';

//GlobalStyles
import { GlobalTransition } from './components/GlobalComponent';

//Components
import Wrapper from './components/Wrapper';


const Main = styled.div`
`;

function App() {
  useEffect (() => {
    localStorage.removeItem("PathTaken");
  }, []);
  return (
    <Main>
      <GlobalTransition />
      <PathTakenProvider>
        <GameStateProvider>
          <ThemeProvider>
            <ShowRecapProvider> 
              <Wrapper />
            </ShowRecapProvider>
          </ThemeProvider>
        </GameStateProvider>
      </PathTakenProvider>
    </Main>
    
  );
}

export default App;
