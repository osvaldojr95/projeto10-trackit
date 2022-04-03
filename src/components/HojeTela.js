import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useUser } from "../contexts/UserContext";
import { useHabitosHoje } from "../contexts/HabitosHojeContext";
import axios from "axios";
import Header from "./Header"
import Footer from "./Footer";
import HabitoHoje from "./HabitoHoje";

export default function HojeTela() {
    const [situacao, setSituacao] = useState("lista");
    const [renderizar, setRenderizar] = useState([]);
    const { userInfo, setUserInfo } = useUser();
    const { habitosHoje, setHabitosHoje, porcentagem } = useHabitosHoje();
    const progresso = setProgresso();
    const lista = setLista();
    dayjs.locale('pt-br');
    const now = dayjs().format("dddd, DD/MM");
    const navigate = useNavigate();

    function setProgresso() {
        if (porcentagem === 0) {
            return <>
                <Sub>Nenhum hábito concluído ainda</Sub>
            </>
        } else {
            return <>
                <Sub verde>{(porcentagem * 100).toFixed(0)}% dos hábitos concluídos</Sub>
            </>
        }
    }

    function setLista() {
        switch (situacao) {
            case "erro":
                return <>
                    <Sub>Ocorreu um erro ao carregar seus hábitos, por favor faça login novamente.</Sub>
                    <BotaoSair onClick={() => {
                        localStorage.removeItem('userInfo');
                        navigate("/");
                    }}>
                        Sair
                    </BotaoSair>
                </>

            case "lista":
                return habitosHoje.map((habito) => {
                    return <HabitoHoje
                        key={habito.id}
                        id={habito.id}
                        name={habito.name}
                        done={habito.done}
                        currentSequence={habito.currentSequence}
                        highestSequence={habito.highestSequence}
                        setRenderizar={setRenderizar} />
                });

            default:
                return <span>default</span>
        }
    }

    useEffect(() => {
        const infoSerializado = localStorage.getItem("userInfo");
        let token = "";
        if(userInfo.token !== undefined){
            token = userInfo.token;
        }
        else if(infoSerializado){
            const user = JSON.parse(infoSerializado);
            token = user.token;
            setUserInfo(user);
        }

        const config = { headers: { Authorization: `Bearer ${token}` } }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHabitosHoje(data);
            setSituacao("lista");
        });
        promise.catch(err => {
            setSituacao("erro");
        });
    }, [renderizar]);

    return (
        <Container>
            <Header />
            <Topo>
                <h2>{now.charAt(0).toUpperCase() + now.slice(1)}</h2>
                {progresso}
            </Topo>
            {lista}
            <Footer />
        </Container>
    )
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
`;

const Sub = styled.h3`
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: ${props => props.verde ? "#8FC549" : "#BABABA"};
`;

const Topo = styled.div`
    margin-bottom: 17px;

    h2 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 23px;
        color: var(--blue-dark);
        margin-top: 28px;
        margin-bottom: 8px;
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