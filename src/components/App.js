import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import UserContext from "../contexts/UserContext"
import CadastroTela from "./CadastroTela"
import LoginTela from "./LoginTela"
import HojeTela from "./HojeTela"

export default function App() {
    const [userInfo,setUserInfo] = useState({});

    return (
        <>
            <UserContext.Provider value={{userInfo,setUserInfo}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginTela />} />
                        <Route path="/cadastro" element={<CadastroTela />} />
                        <Route path="/hoje" element={<HojeTela />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}