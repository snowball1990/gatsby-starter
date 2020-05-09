import React from "react"
import { withPrefix } from "gatsby"
import { IntlProvider } from "react-intl"

import { ThemeProvider } from "@/contexts/ThemeContext"
import { IntlContextProvider } from "@/contexts/IntlContext"
import { I18nProvider } from "@/contexts/I18nContext"
import GlobalStyles from "@/styles/GlobalStyles"
import Redirect from "@/components/redirect"
import { getBrowerLngPrefer } from "@/utils/browserLngAdapter"
import { LS_I18N_LNG_KEY } from "@/utils/constants"


const withProvider = (intl) => (children) => {
  return (
    <IntlProvider
      locale={intl.language}
      defaultLocale={intl.defaultLng}
      messages={intl.messages}
    >
      <IntlContextProvider value={intl}>
        <I18nProvider>
          <ThemeProvider>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </IntlContextProvider>
    </IntlProvider>
  )
}

const App = (props) => {
  const { element, pageContext, location } = props
  if (!pageContext) {
    return
  }
  const { intl } = pageContext
  const { language, languages, redirect, routed, originalPath,defaultLng } = intl

  if (typeof window !== "undefined") {
    window.___gatsbyI18n = intl
  }

  const isRedirect = redirect && !routed
  if (isRedirect) {
    const { search } = location

    // Skip build, Browsers only
    if (typeof window !== "undefined") {
      let detected = window.localStorage.getItem(LS_I18N_LNG_KEY) ||
      getBrowerLngPrefer({
        languages,
        defaultLng,
      })
      
      if (!languages.includes(detected)) {
        detected = language
      }

      const queryParams = search || ""
      const newUrl = withPrefix(`/${detected}${originalPath}${queryParams}`)
      window.location.replace(newUrl)
    }
  }

  const renderElement = isRedirect ? <Redirect /> : element

  return withProvider(intl)(renderElement)
}

export default App
