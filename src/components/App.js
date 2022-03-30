import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components";

import UserContext from "../contexts/UserContext"

import ResetCss from "../styles/resetCss";
import GlobalStyle from "../styles/globalStyles";
import CadastroTela from "./CadastroTela"
import LoginTela from "./LoginTela"
import HabitosTela from "./HabitosTela"
import HojeTela from "./HojeTela"
import HistoricoTela from "./HistoricoTela";

export default function App() {
    const [userInfo,setUserInfo] = useState({});

    return (
        <>
        <ResetCss />
        <GlobalStyle />
        <Container>
            <UserContext.Provider value={{userInfo,setUserInfo}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginTela />} />
                        <Route path="/cadastro" element={<CadastroTela />} />
                        <Route path="/habitos" element={<HabitosTela />} />
                        <Route path="/hoje" element={<HojeTela />} />
                        <Route path="/historico" element={<HistoricoTela />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;