import styled from "styled-components";
import { useUser } from "../contexts/UserContext";

export default function Header() {
    const { userInfo } = useUser();

    return (
        <Container>
            <h2>TrackIt</h2>
            <img src={userInfo.image} alt="Foto de perfil" />
        </Container>
    );
}

const Container = styled.header`
    height: 70px;
    width: 100%;
    position: fixed;
    background-color: var(--blue-dark);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    top: 0;
    left: 0;
    right: 0;
    z-index:3;

    h2 {
        font-family: "Playball", cursive;
        font-size: 40px;
        color: var(--white);
    }

    img {
        height: 51px;
        width: 51px;
        border-radius: 50%;
    }
`;