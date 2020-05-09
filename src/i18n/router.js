import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink, navigate as gatsbyNavigate } from "gatsby"

import { IntlContextConsumer } from "@/contexts/IntlContext"
import { LS_I18N_LNG_KEY } from "@/utils/constants"

const Link = ({ to, language, children, onClick, ...rest }) => (
  <IntlContextConsumer>
    {intl => {
      const languageLink = language || intl.language
      const link = intl.routed || language ? `/${languageLink}${to}` : `${to}`

      const handleClick = e => {
        if (language) {
          localStorage.setItem(LS_I18N_LNG_KEY, language)
        }
        if (onClick) {
          onClick(e)
        }
      }

      return (
        <GatsbyLink {...rest} to={link} onClick={handleClick}>
          {children}
        </GatsbyLink>
      )
    }}
  </IntlContextConsumer>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  language: PropTypes.string,
}

Link.defaultProps = {
  to: "",
}

export default Link

export const navigate = (to, options) => {
  if (typeof window === "undefined") {
    return
  }

  const { language, routed } = window.___gatsbyI18n
  const link = routed ? `/${language}${to}` : `${to}`
  gatsbyNavigate(link, options)
}