import styled from "styled-components";
import React, { useState, useEffect } from "react";

import Attribution from './attribution';

const Main = styled.div`
    padding-top: 0px;
    margin: auto auto;
    max-width: 768px;

    & > * {
        text-align: center;
    }
`;

const Title = styled.h1`
    color: ${props => props.darkTheme? "black":"white"};
    font-size: 54px;
    margin-bottom: 20px;
`;

function Content (){
    return(
        <Main>
            <Title>Start your Adventure</Title>
            <Attribution />
        </Main>
    )
};

export default Content;