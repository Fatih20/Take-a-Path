import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import Content from './Content/content';
import Header from './Header/header';
import Attribution from "./Content/attribution";

import { useTheme } from '../ThemeContext';

const Main = styled.div`
`;

function Wrapper() {

  const[gameState, setGameState] = useState(2);

  const darkTheme = useTheme();

  useEffect(() => {
    if (darkTheme){document.body.style.backgroundColor = "#1a1a1a";
  } else {document.body.style.backgroundColor = "#f7f7f7";}

    return () => {document.body.style.backgroundColor = null;}
  });

  return (
    <Main>
        <Header />
        <Content />
    </Main>
    
  );
}

export default Wrapper;