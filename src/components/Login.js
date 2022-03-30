import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "./../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin(event) {
    event.preventDefault();

    /*
    const requisicao = axios.post("https://minha-api.com/login", {
      email: email,
      senha: senha
    });

    // ..
    */

    console.log("Fazer Login");
  }

  return (
    <Container>
      <img src={LogoImg} alt="Logo" />
      <h1>TrackIt</h1>
      <form onSubmit={fazerLogin}>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={senha}
          placeholder="senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/cadastro">
        Não tem uma conta? Cadastre-se!
      </Link>
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    height: auto;
    width: 180px;
    margin-top: 15%;
  }

  h1 {
    font-family: "Playball", cursive;
    font-size: 70px;
    color: var(--blue-dark);
    margin-top: 10px;
    margin-bottom: 30px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 6%;
  }
  
  input {
    height: 45px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--grey-ligth);
    margin-bottom: 6px;
    padding: 0 10px;
    font-size: 20px;
    color: var(--grey-dark);
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

  button {
    height: 45px;
    width: 100%;
    border-radius: 5px;
    border: none;
    background-color: var(--blue-ligth);
    font-size: 21px;
    color: var(--white);
  }

  a {
    font-size: 14px;
    text-decoration: underline;
    color: var(--blue-ligth);
    margin-top: 30px;
  }
`;
