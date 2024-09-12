// src/context/MyContext.tsx
"use client";
import { MyProductApi } from '@/interfaces/myProducts';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina a interface para o estado e as funções do contexto
interface MyContextType {
    state: MyProductApi[];
    setState: React.Dispatch<React.SetStateAction<MyProductApi[]>>
}

// Crie o contexto com um valor padrão (opcional)
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crie o Provider com o valor do contexto para usar na aplicação
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<MyProductApi[]>([]);

    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};

// Crie um hook customizado para usar o contexto
export const useMyContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};