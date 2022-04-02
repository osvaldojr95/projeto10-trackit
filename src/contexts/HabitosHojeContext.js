import React, { createContext, useState, useContext, useEffect } from "react";

const HabitosHojeContext = createContext();

export default function HabitosHojeProvider({ children }) {
    const [habitosHoje, setHabitosHoje] = useState([]);
    const [porcentagem, setPorcentagem] = useState(0);

    useEffect(() => {
        if (habitosHoje.length !== 0) {
            let completos = habitosHoje.filter((habito) => {
                if (habito.done) {
                    return true;
                }
                return false;
            }).length;
            setPorcentagem(completos / habitosHoje.length);
        }
    }, [habitosHoje]);

    return (
        <HabitosHojeContext.Provider
            value={{
                habitosHoje,
                setHabitosHoje,
                porcentagem
            }}
        >
            {children}
        </HabitosHojeContext.Provider>
    );
}
export function useHabitosHoje() {
    const context = useContext(HabitosHojeContext);
    const { habitosHoje, setHabitosHoje, porcentagem } = context;
    return { habitosHoje, setHabitosHoje, porcentagem };
}