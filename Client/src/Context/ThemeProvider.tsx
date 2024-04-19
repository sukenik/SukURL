import React, { useContext, useState } from "react"

interface iStylesContext {
    darkTheme: boolean
    toggleDarkTheme: () => void
}

const ThemeContext = React.createContext<iStylesContext | null>(null)
export const useThemeContext = () => useContext(ThemeContext) as iStylesContext

const ThemeProvider: React.FC = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(true)

    const toggleDarkTheme = () => setDarkTheme(prevState => !prevState)

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider