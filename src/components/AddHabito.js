import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function AddHabito(props) {
    const { setRenderizar, novoHabito, setNovoHabito } = props;
    const { userInfo } = useUser();
    const listaDias = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [dias, setDias] = useState([]);

    function toggle(dia) {
        const index = dias.indexOf(dia);
        if (index !== -1) {
            dias.splice(index, 1);
        } else {
            dias.push(dia);
        }
        setDias([...dias.sort()]);
    }

    function salvar() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }
        const obj = {
            name: nome,
            days: dias
        }
        const promise = axios.post(URL, obj, config);
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

    if (!novoHabito) {
        return <></>
    } else {
        return (
            <Container>
                <input value={nome} placeholder={"nome do hábito"} onChange={(e) => { setNome(e.target.value) }} />
                <Dias>
                    {listaDias.map((dia, index) => {
                        return <Dia
                            key={index}
                            cor={(dias.indexOf(index) !== -1 ? branco : cinza)}
                            background={(dias.indexOf(index) !== -1 ? cinza : branco)}
                            onClick={() => { toggle(index) }}>
                            {dia}
                        </Dia>
                    })}
                </Dias>
                <Botoes>
                    <span onClick={() => setNovoHabito(false) }>Cancelar</span>
                    <button onClick={() => salvar() }>Salvar</button>
                </Botoes>
            </Container>
        );
    }
}

const branco = "#FFFFFF";
const cinza = "#CFCFCF";

const Container = styled.div`
    height: 180px;
    width: 100%;
    background-color: var(--white);
    border-radius: 5px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 15px;

    input {
        height: 45px;
        width: 100%;
        font-size: 20px;
        background-color: var(--white);
        color: var(--grey-dark);
        border: 1px solid var(--grey-ligth);
        border-radius: 5px;
        padding: 0 11px;
    }

    input::placeholder {
        opacity: 1;
        color: var(--grey-ligth);
    }

    input:-ms-input-placeholder {
        color: var(--grey-ligth);
    }

    input::-ms-input-placeholder {
        color: var(--grey-ligth);
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

const Botoes = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
        
    span {
        font-size: 16px;
        color: var(--blue-ligth) !important;
        margin-right: 23px;
    }

    button {
        height: 35px;
        width: 84px;
        color: ${props => props.cor};
        font-size: 16px;
        background-color: var(--blue-ligth);
        border: none;
        border-radius: 5px;
        color: var(--white);
    }
`;