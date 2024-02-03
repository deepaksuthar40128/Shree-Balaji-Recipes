'use client'
import { useContext, useState, createContext, ReactNode } from "react";
export type ThemeContextType = {
    mode: string;
    toggle: () => void;
};

export const ThemeContext = createContext({
    mode: 'light',
    toggle: () => { },
});
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState('light');

    const toggle = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
    const contextValue: ThemeContextType = {
        mode,
        toggle,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={mode == 'light' ? "theme-light" : "theme-dark"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
