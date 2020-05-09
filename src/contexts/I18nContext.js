import React from "react"
import { navigate as gatsbyNavigate } from "gatsby"

import { LS_I18N_LNG_KEY } from "@/utils/constants"

const changeLocale = (language) => {
  if (typeof window === "undefined") {
    return
  }
  const { originalPath } = window.___gatsbyI18n

  const link = `/${language}${originalPath}${window.location.search}`

  localStorage.setItem(LS_I18N_LNG_KEY, language)
  gatsbyNavigate(link)
}

export const I18nContext = React.createContext()
export const I18nProvider = ({ children }) => {
  const [lng, rawSetLng] = React.useState(undefined)

  React.useEffect(() => {
    const root = window.document.documentElement

    const initialLngValue = root.lang

    rawSetLng(initialLngValue)
  }, [])

  const contextValue = React.useMemo(() => {
    function setLng(newValue) {
      
      const root = window.document.documentElement

      root.setAttribute("lang",newValue)

      localStorage.setItem(LS_I18N_LNG_KEY, newValue)

      changeLocale(newValue)

      rawSetLng(newValue)
    }

    return {
      lng,
      setLng,
    }
  }, [lng, rawSetLng])

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}