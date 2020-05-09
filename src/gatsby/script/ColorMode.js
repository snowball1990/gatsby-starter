import React from "react"
import Terser from "terser"

import COLORS from "@/theme/colors"
import { objectToVars } from "@/utils/cssVarConverter"

import { 
  LS_COLOR_MODE_KEY,
  INIT_COLOR_MODE_PROP 
} from "@/utils/constants"

function setColorsByTheme() {
  const defaultStyles = '🎨';
  const colorModeKey = '🔑';
  const initColorModeProp = '🗝️';
  const root = document.documentElement;
  const COLORS = defaultStyles

  document.body.style.setProperty('background', 'var(--gatsby-colors-background-primary)')

  let theme = "light"
  try {
    theme = localStorage.getItem(colorModeKey)
  } catch (err) {}
  if (!theme) {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    theme = darkQuery.matches ? "dark" : "light"
  }

  root.style.setProperty(initColorModeProp, theme)

  Object.entries(COLORS[theme]).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })

}

const MagicColorModeScriptTag = () => {

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

  const boundFn = String(setColorsByTheme)
    .replace("'🎨'", JSON.stringify(styles))
    .replace('🔑', LS_COLOR_MODE_KEY)
    .replace('🗝️', INIT_COLOR_MODE_PROP);

  let calledFunction = `(${boundFn})()`

  calledFunction = Terser.minify(calledFunction).code

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}


export default MagicColorModeScriptTag