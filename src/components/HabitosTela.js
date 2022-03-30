import styled from "styled-components";
import Header from "./Header"
import Footer from "./Footer";

export default function Histórico() {
    return (
        <Container>
            <Header />
            <h5>Hábitos</h5>
            <span>
                Lista de hábitos!
            </span>
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
    }
`;