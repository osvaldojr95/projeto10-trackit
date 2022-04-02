import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import Habito from "./Habito";
import AddHabito from "./AddHabito";

export default function HabitosTela() {
    const [habitos, setHabitos] = useState([]);
    const [situacao, setSituacao] = useState("lista");
    const [renderizar, setRenderizar] = useState([]);
    const [novoHabito, setNovoHabito] = useState(false);
    const { userInfo } = useUser();
    const navigate = useNavigate();
    let lista = setLista(situacao);

    function setLista() {
        switch (situacao) {
            case "erro":
                return <>
                    <span>Ocorreu um erro ao carregar seus hábitos, por favor faça login novamente.</span>
                    <BotaoSair onClick={() => navigate("/")}>
                        Sair
                    </BotaoSair>
                </>

            case "nenhum":
                return <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>;

            case "lista":
                return habitos.map((habito) => {
                    return <Habito
                        key={habito.id}
                        id={habito.id}
                        name={habito.name}
                        days={habito.days}
                        setRenderizar={setRenderizar}
                        setNovoHabito={setNovoHabito} />
                });

            default:
                return <span>default</span>
        }
    }

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHabitos(data);
            setSituacao(data.length > 0 ? "lista" : "nenhum");
        });
        promise.catch(err => {
            setSituacao("erro");
        });
    }, [renderizar]);


    return (
        <Container>
            <Header />
            <Topo>
                <h5>Hábitos</h5>
                <button onClick={() => { (novoHabito ? setNovoHabito(false) : setNovoHabito(true)) }}>+</button>
            </Topo>
            <AddHabito setRenderizar={setRenderizar} novoHabito={novoHabito} setNovoHabito={setNovoHabito} habitos={habitos} setHabitos={setHabitos} />
            {lista}
            <Footer />
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    padding: 70px 17px;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;

    span {
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: var(--grey-dark);
        line-height: 22px;
    }
`;

const Topo = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h5 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 23px;
        color: var(--blue-dark);
        margin-top: 28px;
        margin-bottom: 17px;
    }

    button {
        height: 35px;
        width: 40px;
        background-color: var(--blue-ligth);
        border: none;
        border-radius: 4.5px;
        color: var(--white);
        font-size: 24px;
        display: flex;
        justify-content: center;
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