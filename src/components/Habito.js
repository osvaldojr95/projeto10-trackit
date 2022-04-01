import styled from "styled-components";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import TrashImg from "./../assets/trash.png"

export default function Habito(props) {
    const { id, name, days, setRenderizar, setNovoHabito } = props;
    const { userInfo } = useUser();
    const listaDias = ["D", "S", "T", "Q", "Q", "S", "S"];

    function Deletar() {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }
        const promise = axios.delete(URL, config);
        promise.then(response => {
            const { data } = response;
            console.log(data);
            setRenderizar([]);
            setNovoHabito(false);
        });
        promise.catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Topo>
                <h5>{name}</h5>
                <img src={TrashImg} onClick={() => Deletar()} alt="botão deletar" />
            </Topo>
            <Dias>
                {listaDias.map((dia, index) => {
                    return <Dia
                        key={index}
                        cor={(days.indexOf(index) !== -1 ? branco : cinza)}
                        background={(days.indexOf(index) !== -1 ? cinza : branco)}>
                        {dia}
                    </Dia>
                })}
            </Dias>
        </Container>
    );
}


const branco = "#FFFFFF";
const cinza = "#CFCFCF";

const Container = styled.div`
    height: auto;
    width: 100%;
    background-color: var(--white);
    border-radius: 5px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 15px;
`;

const Topo = styled.div`
    height: auto;
    width: 100%;
    position: relative;
    margin-bottom: 10px;

    h5 {
        height: auto;
        width: 100%;
        padding-right: 30px;
        font-size: 20px;
        color: var(--grey-dark);
    }

    img {
        height: auto;
        width: 20px;
        position: absolute;
        top: 0;
        right: 0;
    }
`;

const Dias = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start ;
    align-items: center;
`;

const Dia = styled.button`
    height: 30px;
    width: 30px;
    color: ${props => props.cor};
    font-size: 20px;
    background-color: ${props => props.background};
    border: 1px solid #CFCFCF;
    border-radius: 5px;
    margin-right: 4px;
`;