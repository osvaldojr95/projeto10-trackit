import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Header from "./Header"
import Footer from "./Footer";

export default function HistóricoTela() {
    const { userInfo, setUserInfo } = useUser();
    const [historico, setHistorico] = useState([]);
    const [situação, setSituação] = useState(true);
    const calendario = setCalendario();
    const navigate = useNavigate();

    function setCalendario() {
        if (situação) {
            return <></>

        } else {
            return <>
                <span>Ocorreu um erro ao carregar seus hábitos, por favor faça login novamente.</span>
                <BotaoSair onClick={() => {
                    localStorage.removeItem('userInfo');
                    navigate("/");
                }}>
                    Sair
                </BotaoSair>
            </>
        }
    }

    useEffect(() => {
        const infoSerializado = localStorage.getItem("userInfo");
        let token = "";
        if (userInfo.token !== undefined) {
            token = userInfo.token;
        }
        else if (infoSerializado) {
            const user = JSON.parse(infoSerializado);
            token = user.token;
            setUserInfo(user);
        }

        const config = { headers: { Authorization: `Bearer ${token}` } }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHistorico(data);
            setSituação(true);
            console.log(data);
        });
        promise.catch(err => {
            console.log(err);
            setSituação(false);
        });
    }, []);

    return (
        <Container>
            <Header />
            <h5>Histórico</h5>
            {calendario}
            <Footer />
        </Container>
    );
}

const Container = styled.footer`
    height: 100vh;
    width: 100%;
    padding: 70px 17px;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h5 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 23px;
        color: var(--blue-dark);
        margin-top: 28px;
        margin-bottom: 17px;
    }

    span {
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: var(--grey-dark);
        line-height: 22px;
    }
`;

const BotaoSair = styled.button`
    height: 35px;
    width: 80px;
    background-color: var(--blue-ligth);
    border: none;
    border-radius: 4.5px;
    color: var(--white);
    font-size: 24px;
    margin: 15px auto;
`;