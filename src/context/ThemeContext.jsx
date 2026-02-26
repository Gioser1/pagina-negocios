import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isGlobalLightMode, setIsGlobalLightMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ isGlobalLightMode, setIsGlobalLightMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
