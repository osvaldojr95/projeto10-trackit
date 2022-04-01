import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import Habito from "./Habito";
import AddHabito from "./AddHabito";

export default function HabitosTela() {
    const [habitos, setHabitos] = useState([]);
    const [renderizar, setRenderizar] = useState([]);
    const [novoHabito, setNovoHabito] = useState(false);
    const { userInfo } = useUser();
    let lista = setLista();

    function setLista() {
        if (habitos.length === 0) {
            return (<span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>);
        } else {
            return habitos.map((habito) => {
                return <Habito
                    key={habito.id}
                    id={habito.id}
                    name={habito.name}
                    days={habito.days} 
                    setRenderizar={setRenderizar}
                    setNovoHabito={setNovoHabito}/>
            });
        }
    }

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHabitos(data);
        });
        promise.catch(err => {
            console.log(err);
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
    }
`;