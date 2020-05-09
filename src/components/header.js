import React from "react"
import PropTypes from "prop-types"

import DarkModeToggle from "./DarkModeToggle"
import I18nToggle from "./I18nToggle"

import useTranslation from "@/hooks/useTranslation"

const Header = ({ siteTitle }) => {
  const t = useTranslation()
  return (
    <header
      style={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        marginBottom: `1.45rem`,
        padding: `0 20px`,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          padding: `1.45rem 0`,
        }}
      >
        <h1 style={{ margin: 0 }}>{t('homePage.heading')}</h1>
      </div>
      <div style={{
        display: `flex`,
      }}>
        <I18nToggle />
        <DarkModeToggle />
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
