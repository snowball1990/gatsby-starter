import React from "react"

import COLORS from "@/theme/colors"
import { LS_COLOR_MODE_KEY,INIT_COLOR_MODE_PROP } from "@/utils/constants"
import { objectToVars } from "@/utils/cssVarConverter"


export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined)

  React.useEffect(() => {
    const root = window.document.documentElement

    // Because colors matter so much for the initial page view, we're
    // doing a lot of the work in gatsby-ssr. That way it can happen before
    // the React component tree mounts.
    const initialColorValue = root.style.getPropertyValue(INIT_COLOR_MODE_PROP)

    rawSetColorMode(initialColorValue)
  }, [])

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement

      localStorage.setItem(LS_COLOR_MODE_KEY, newValue)

      root.style.setProperty(INIT_COLOR_MODE_PROP, newValue)

      const defaultStyles = objectToVars("colors", COLORS)
      const styles = {
        light: {
          ...defaultStyles,
        },
      }
      const { modes = {} } = COLORS
      Object.keys(modes).forEach((mode) => {
        const key = mode
        styles[key] = objectToVars("colors", modes[mode])
      })

      Object.entries(styles[newValue]).forEach(([name, value]) => {
        root.style.setProperty(name, value)
      })

      rawSetColorMode(newValue)
    }

    return {
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
