import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import Habito from "./Habito";

export default function Histórico() {
    const [loading, setLoading] = useState(false);
    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState(false);
    const { userInfo } = useUser();
    let adicionarHabito = toggle();
    
    function toggle(){
        if(!novoHabito){
            return (<></>);
        }
        else {
            return (
                <input/>
            );
        }
    }

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        const promise = axios.get(URL, config);
        setLoading(true);
        promise.then(response => {
            const { data } = response;
            setHabitos([...data]);
            setLoading(false);
        });
        promise.catch(err => {
            setLoading(false);
            console.log(err);
        });
    },[]);


    return (
        <Container>
            <Header />
            <Topo>
                <h5>Hábitos</h5>
                <button onClick={()=>{(novoHabito ? setNovoHabito(false) : setNovoHabito(true))}}>+</button>
            </Topo>
            {adicionarHabito}
            {habitos.map((habito) => {
                return (
                    <Habito id={habito.id} nome={habito.name} days={habito.days} />
                )
            })}
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


    span {
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: var(--grey-dark);
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