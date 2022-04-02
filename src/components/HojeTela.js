import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useHabitosHoje } from "../contexts/HabitosHojeContext";
import axios from "axios";
import Header from "./Header"
import Footer from "./Footer";
import HabitoHoje from "./HabitoHoje";

export default function HojeTela() {
    const [situacao, setSituacao] = useState("lista");
    const [renderizar, setRenderizar] = useState([]);
    const { userInfo } = useUser();
    const { habitosHoje, setHabitosHoje, porcentagem } = useHabitosHoje();
    const navigate = useNavigate();
    const progresso = setProgresso();
    const lista = setLista();

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
                    <BotaoSair onClick={() => navigate("/")}>
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
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
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
                <h2>Hoje</h2>
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