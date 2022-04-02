import styled from "styled-components";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import CheckImg from "./../assets/check.png"

export default function Habito(props) {
    const { id, name, done, currentSequence, highestSequence, setRenderizar } = props;
    const { userInfo } = useUser();
    const recordeVerde = ((done && (currentSequence === highestSequence)) ? true : false);

    function toggle() {
        let URL;
        if (done) {
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        } else {
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        }
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }
        const promise = axios.post(URL, {}, config);
        promise.then(response => {
            setRenderizar([]);
        });
        promise.catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <h4>{name}</h4>
            <h5>Sequencia atual: <Verde cor={done}>{currentSequence} {currentSequence !== 1 ? "dias" : "dia"}</Verde></h5>
            <h5>Seu recorde: <Verde cor={recordeVerde}>{highestSequence} dias</Verde></h5>
            <Check cor={done} onClick={(()=>toggle())}><img src={CheckImg} alt="Check"/></Check>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    padding: 13px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--white);
    border-radius: 5px;
    margin-bottom: 15px;
    font-family: "Lexend Deca", sans-serif;
    position: relative;
    overflow-y: scroll;
    
    h4 {
        height: auto;
        width: 100%;
        padding-right: 95px;
        font-size: 20px;
        color: var(--grey-dark);
        margin-bottom: 7px;
    }
    
    h5 {
        height: auto;
        width: 100%;
        padding-right: 95px;
        font-size: 13px;
        color: var(--grey-dark);
        margin-bottom: 3px;
    }
`;

const Check = styled.button`
    height: 69px;
    width: 69px;
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translate(0,-50%);
    color: var(--white);
    background-color: ${props => props.cor ? "#8FC549" : "#E7E7E7"};
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
        height: 28px;
        width: 35px;
    }
`;

const Verde = styled.span`
    color: ${props => props.cor ? "#8FC549" : "#666666"};
`; 