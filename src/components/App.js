import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components";

import UserProvider from "../contexts/UserContext"

import ResetCss from "../styles/resetCss";
import GlobalStyle from "../styles/globalStyles";
import CadastroTela from "./CadastroTela"
import LoginTela from "./LoginTela"
import HabitosTela from "./HabitosTela"
import HojeTela from "./HojeTela"
import HistoricoTela from "./HistoricoTela";

export default function App() {
    return (
        <>
            <ResetCss />
            <GlobalStyle />
            <Container>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LoginTela />} />
                            <Route path="/cadastro" element={<CadastroTela />} />
                            <Route path="/habitos" element={<HabitosTela />} />
                            <Route path="/hoje" element={<HojeTela />} />
                            <Route path="/historico" element={<HistoricoTela />} />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;