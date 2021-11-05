import React, { useEffect } from "react";
import styled from 'styled-components';

//Context
import Content from './Content/content';
import Header from './Header/header';
import { useTheme } from '../context/ThemeContext';

const Main = styled.div`
  @media (max-width: 820px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (max-width: 425px) {
    padding-left: 7px;
    padding-right: 7px;
  }
`;

function Wrapper() {

  const darkTheme = useTheme();

  useEffect(() => {
    if (darkTheme){document.body.style.backgroundColor = "#1a1a1a";
  } else {document.body.style.backgroundColor = "#f7f7f7";}

    return () => {document.body.style.backgroundColor = null;}
  }, [darkTheme]);

  return (
    <Main>
        <Header />
        <Content />
    </Main>
    
  );
}

export default Wrapper;