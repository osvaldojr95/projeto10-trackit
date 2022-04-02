import styled from "styled-components";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import TrashImg from "./../assets/trash.png"

export default function Habito(props) {
    const { id, name, days, setRenderizar, setNovoHabito } = props;
    const { userInfo } = useUser();
    const [confirmar, setConfirmar] = useState(false);
    const listaDias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const botaoDeletar = botaoDelete();

    function botaoDelete() {
        if (!confirmar) {
            return (
                <CancelConfirm>
                    <img src={TrashImg} onClick={() => setConfirmar(true)} alt="botão deletar" />
                </CancelConfirm>
            );
        } else {
            return (
                <CancelConfirm>
                    <h6 onClick={() => setConfirmar(false)}>Cancelar</h6>
                    <button onClick={() => deletar()}>
                        Confirmar
                    </button>
                </CancelConfirm>
            );
        }
    }

    function deletar() {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }
        const promise = axios.delete(URL, config);
        promise.then(response => {
            const { data } = response;
            console.log(data);
            setRenderizar([]);
            setNovoHabito(false);
        });
        promise.catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Topo confirma={confirmar}>
                <h5>{name}</h5>
                {botaoDeletar}
            </Topo>
            <Dias>
                {listaDias.map((dia, index) => {
                    return <Dia
                        key={index}
                        cor={(days.indexOf(index) !== -1 ? branco : cinza)}
                        background={(days.indexOf(index) !== -1 ? cinza : branco)}>
                        {dia}
                    </Dia>
                })}
            </Dias>
        </Container>
    );
}


const branco = "#FFFFFF";
const cinza = "#CFCFCF";

const Container = styled.div`
    height: auto;
    width: 100%;
    background-color: var(--white);
    border-radius: 5px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 15px;
    position: relative;
`;

const Topo = styled.div`
    height: auto;
    width: 100%;
    margin-bottom: 10px;

    h5 {
        height: auto;
        width: 100%;
        padding-right: ${props=> !props.confirma ? "30px" : "170px"};
        font-size: 20px;
        color: var(--grey-dark);
    }

    h6 {
        height: auto;
        width: 100%;
        margin-right: 5px;
        font-size: 15px;
        color: var(--blue-ligth);
    }

    button {
        height: 25px;
        width: 90px;
        color: var(--white);
        font-size: 15px;
        background-color: var(--blue-ligth);
        border: none;
        border-radius: 5px;
        margin-right: 4px;
    }
`;

const CancelConfirm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end ;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;

    img {
        height: auto;
        width: 20px;
    }
`;

const Dias = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start ;
    align-items: center;
`;

const Dia = styled.button`
    height: 30px;
    width: 30px;
    color: ${props => props.cor};
    font-size: 20px;
    background-color: ${props => props.background};
    border: 1px solid #CFCFCF;
    border-radius: 5px;
    margin-right: 4px;
`;