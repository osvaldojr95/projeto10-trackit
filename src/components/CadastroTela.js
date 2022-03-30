import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "axios";
import styled from "styled-components";
import LogoImg from "./../assets/logo.png";

export default function CadastroTela() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function efetuarCadastro(event) {
    event.preventDefault();

    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const obj = { email: email, name: nome, image: foto, password: senha };
    const promise = post(URL, obj);
    setLoading(true);
    promise.then(response => {
      // ???
      // const { data } = response;
      setLoading(false);
      navigate("/");
    });
    promise.catch(err => {
      // 422 (Provavelmente a imagem está errada)
      // 409 (Provavelmente ja existe essa conta)
      setLoading(false);
      console.log(err);
    });

  }

  return (
    <Container>
      <img src={LogoImg} alt="Logo" />
      <h1>TrackIt</h1>
      <form onSubmit={efetuarCadastro}>
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
        <input
          type="text"
          value={nome}
          placeholder="nome"
          required
          disabled={loading}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          value={foto}
          placeholder="foto"
          required
          disabled={loading}
          onChange={(e) => setFoto(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/">
        Já tem uma conta? Faça login!
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
  padding-bottom: 90px;

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