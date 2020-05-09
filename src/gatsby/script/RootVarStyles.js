import React from "react"

import theme from "@/theme"
import { objectToVars } from "@/utils/cssVarConverter"

const RootVarStyles = () => {

  const { colors,...base } = theme

  const baseStyles = objectToVars("",base)

  const cssVariableString = Object.entries(baseStyles).reduce(
    (acc, [name, value]) => {
      return `${acc}\n${name}: ${value};`
    },
    ""
  )

  const wrappedInSelector = `:root { ${cssVariableString} \n}`

  return <style>{wrappedInSelector}</style>
}


export default RootVarStyles