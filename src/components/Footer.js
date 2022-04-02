import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { useHabitosHoje } from "../contexts/HabitosHojeContext";

export default function Footer() {
    const { porcentagem } = useHabitosHoje();
    const navigate = useNavigate();

    return (
        <Container>
            <Link to="/habitos">Hábitos</Link>
            <div onClick={()=>navigate("/hoje")}>
                <CircularProgressbar
                    value={porcentagem}
                    maxValue={1}
                    text={`Hoje`}
                    background
                    backgroundPadding={6}
                />
            </div>
            <Link to="/historico">Histórico</Link>
        </Container>
    );
}

const Container = styled.footer`
    height: 70px;
    width: 100%;
    position: fixed;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    bottom: 0;
    left: 0;
    right: 0;
    z-index:3;

    a {
        text-decoration: none;
        text-align: center;
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: var(--blue-ligth);
        width: 90px;
    }

    div {
        position: relative;
        height: 80px;
        width: 80px;
    }

    .CircularProgressbar {
        position: absolute;
        top: -25px;
    }
    .CircularProgressbar-path {
        stroke: var(--white);
        stroke-linecap: round;
    }
    .CircularProgressbar-trail {
        stroke: var(--transparent);
    }
    .CircularProgressbar-text {
        fill: var(--white);
        font-size: 18px;
        dominant-baseline: middle;
        text-anchor: middle;
    }
    .CircularProgressbar-background {
        fill: var(--blue-ligth);
    }

    img {
        height: 51px;
        width: 51px;
        border-radius: 50%;
    }
`;