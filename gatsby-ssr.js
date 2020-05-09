/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from "react"

import App from "@/App"
import MagicColorModeScriptTag from "@/gatsby/script/ColorMode"
import MagicI18nScriptTag from "@/gatsby/script/I18nLng"
import RootVarStyles from "@/gatsby/script/RootVarStyles"
import JSDisabledStyles from "@/gatsby/script/JSDisabledStyles"

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents([
    <RootVarStyles key='RootVarStyles' />,
    <JSDisabledStyles key='JSDisabledStyles' />
  ])
  setPreBodyComponents([
    <MagicColorModeScriptTag key='MagicColorModeScript' />,
    <MagicI18nScriptTag key='MagicI18nScript'/>
  ])
}

export const wrapPageElement = ({ element, props  }) => {
  return <App {...props} element={element} />;
}
