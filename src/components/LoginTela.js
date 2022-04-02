import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useUser } from "../contexts/UserContext";
import LogoImg from "./../assets/logo.png";

export default function LoginTela() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  function fazerLogin(event) {
    event.preventDefault();

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const obj = { email: email, password: senha }
    const promise = axios.post(URL, obj);
    setLoading(true);
    promise.then(response => {
      setLoading(false);
      const { data } = response;
      const { name, id, image, token} = data;
      setUserInfo({ ...userInfo, name, id, image, token })
      navigate("/hoje");
    });
    promise.catch(err => {
      if(err.response.status === 401){
        alert("Email ou senha inseridos errados, tente novamente!");
      } else {
        alert("Ocorreu um erro não identificado no cadastro, por favor tente novamente!");
      }
      setLoading(false);
    });
  }

  return (
    <Container>
      <img src={LogoImg} alt="Logo"/>
      <h1>TrackIt</h1>
      <form onSubmit={fazerLogin}>
        <input
          type="email"
          value={email}
          placeholder="email"
          required
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={senha}
          placeholder="senha"
          required
          disabled={loading}
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

const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);

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
