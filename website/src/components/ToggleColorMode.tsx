import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createMuiTheme } from "../theme/theme";
import { ColorModeContext } from "../context/DarkModeContext";
import Cookies from "js-cookie"

interface ToggleColorModeProps {
  children: React.ReactNode
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {

  const storedColorMode = Cookies.get("colorMode") as "light" | "dark";
  const preferedDarkMode = useMediaQuery("([prefers-color-scheme: dark])");
  const defaultColorMode = storedColorMode || (preferedDarkMode ? "dark" : "light");
  const [mode, setMode] = useState<"light" | "dark">(defaultColorMode);

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? "dark" : "light"))
  }, [])

  useEffect(() => { Cookies.set("colorMode", mode) }, [mode])

  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode])

  const theme = useMemo(() => createMuiTheme(mode || "light"), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode;