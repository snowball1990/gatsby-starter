import React from "react"

import COLORS from "@/theme/colors"
import { objectToVars } from "@/utils/cssVarConverter"

/**
 * If the user has JS disabled, the injected script will never fire!
 * This means that they won't have any colors set, everything will be default
 * black and white.
 * We can solve for this by injecting a `<style>` tag into the head of the
 * document, which sets default values for all of our colors.
 * Only light mode will be available for users with JS disabled.
 */
const JSDisabledStyles = () => {

  const defaultStyles = objectToVars("colors", COLORS)

  const cssVariableString = Object.entries(defaultStyles).reduce(
    (acc, [name, value]) => {
      return `${acc}\n${name}: ${value};`
    },
    ""
  )

  const wrappedInSelector = `html { ${cssVariableString} \n}`

  return <style>{wrappedInSelector}</style>
}


export default JSDisabledStyles