import dayjs from "dayjs";
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import styled from "styled-components";
import CheckImg from "./../assets/check.png"

export default function Detalhes(props) {
    const { valor, lista, show } = props;
    dayjs.extend(CustomParseFormat);
    const content = setContent();

    function setContent() {
        let check = <></>;
        lista.forEach((element) => {
            if (dayjs(valor).format("DD/MM/YYYY") === dayjs(element.day, "DD/MM/YYYY").format("DD/MM/YYYY")) {
                check = (
                    element.habits.map((habit) => {
                        return (
                            <Habit key={habit.id}>
                                <span>{habit.name}</span>
                                <Botao cor={habit.done}>{habit.done ? <img src={CheckImg} alt="check" /> : "X"}</Botao>
                            </Habit>
                        );
                    })
                );
            }
        });
        console.log(check);
        return check;
    }

    return (
        <Container>
            {content}
        </Container>
    );
}

const Container = styled.header`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    `;

const Habit = styled.div`
    height: 80px;
    width: 100%;
    position: relative;
    display: flex;
    border-radius: 8px;
    justify-content: flex-start;
    background-color: var(--white);
    align-items: center;
    margin-bottom: 10px;
    padding: 15px;

    span {
        font-family: "Playball", cursive;
        font-size: 40px;
        color: var(--white);
        padding-right: 70px;
    }
`;

const Botao = styled.button`
    height: 40px;
    width: 40px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translate(0,-50%);
    color: var(--white);
    background-color: ${props => props.cor ? "#8FC549" : "#EA5766"};
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 25px;

    img {
        height: 15px;
        width: 19px;
    }
`;