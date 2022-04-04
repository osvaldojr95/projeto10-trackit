import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useUser } from "../contexts/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import Detalhes from './Detalhes';

export default function HistóricoTela() {
    const { userInfo, setUserInfo } = useUser();
    const [historico, setHistorico] = useState([]);
    const [situação, setSituação] = useState(true);
    const [detalheOpen, setDetalheOpen] = useState(false);
    const [value, onChange] = useState(new Date());
    const calendario = setCalendario();
    const navigate = useNavigate();
    dayjs.extend(CustomParseFormat)

    function setClass(date,diasCompletos,diasIncompletos){
        let classe = "dia";
        diasCompletos.forEach((dia) => {
            if (dayjs(dia.day, "DD/MM/YYYY").format("YYYY/DD/MM") === dayjs(date).format("YYYY/DD/MM")) {
                classe= "dia verde";
            }
        });
        if (classe === "dia") {
            diasIncompletos.forEach((dia) => {
                if (dayjs(dia.day, "DD/MM/YYYY").format("YYYY/DD/MM") === dayjs(date).format("YYYY/DD/MM")) {
                    classe = "dia vermelho";
                }
            });
        }
        return classe;
    }

    function setCalendario() {
        if (situação) {
            let diasCompletos = [];
            let diasIncompletos = [];
            historico.forEach((dia) => {
                let soma = 0;
                dia.habits.forEach((habit) => {
                    if (habit.done) {
                        soma++;
                    }
                })
                if (dia.habits.length === soma) {
                    diasCompletos.push(dia);
                }
                else {
                    diasIncompletos.push(dia);
                }
            });

            return (
                <Box>
                    <Calendar
                        formatShortWeekday={(locale, date) => dayjs(date).locale('pt-br').format("ddd")}
                        calendarType={'US'}
                        formatDay={(locale, date) => <p>{dayjs(date).format('DD')}</p>}
                        tileClassName={({ date }) => setClass(date,diasCompletos,diasIncompletos) }
                        onChange={onChange}
                        value={value} />
                </Box>
            );

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
            <Detalhes show={detalheOpen} valor={value} lista={historico}/>
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
    overflow-y: scroll;

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

    .react-calendar { 
        height: auto;
        width: 100%;
        padding: 20px 10px;
        background-color: #fff;
        color: #222;
        border: none;
        border-radius: 8px;
    }

    .dia{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        p {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #000;
            border-radius: 50%;
            width: 40px;
            height: 40px;
        }
    } 

    .verde p {
        background-color: var(--green);
    }
    
    .vermelho p {
        background-color: var(--red);
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

const Box = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;