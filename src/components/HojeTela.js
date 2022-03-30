import { useState, useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function HojeTela() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    return (
        <>
            <h1>{userInfo.name}</h1>
            <img src={userInfo.image} />
        </>
    )
}