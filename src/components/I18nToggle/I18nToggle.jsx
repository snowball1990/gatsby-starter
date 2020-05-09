import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { I18nContext } from "@/contexts/I18nContext"
import { useSpring, animated } from "react-spring"
import { I18N_LANGUAGES } from "@/utils/constants"

const I18nToggle = () => {
  const { lng, setLng } = React.useContext(I18nContext)
  const [open, setOpen] = useState(false)
  const node = useRef()

  const menuAppear = useSpring({
    zIndex: 99,
    position: "relative",
    transform: open ? "translateY(16px)" : "translateY(0px)",
    opacity: open ? 1 : 0,
  })

  const handleChange = (selectedLng) => {
    if (!open) {
      return
    }
    setLng(selectedLng)
    setOpen(false)
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <DropdownContainer ref={node}>
      <IconWrapper onClick={(e) => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="5">
          <g fillRule="evenodd" fill="none">
            <path d="M0 0h7v5H0z" />
            <path
              className="dropdown"
              stroke="#FFF"
              d="M0 1l3.488 2.737L6.975 1"
            />
          </g>
        </svg>
      </IconWrapper>
      <animated.div style={menuAppear}>
        {open && (
          <ul className="dropdown-menu" style={menuAppear}>
            {I18N_LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                className="dropdown-menu-item"
                onClick={(e) => handleChange(lang.code)}
              >
                <div className="selected">
                  {lng === lang.code && (
                    <svg viewBox="0 0 24 24">
                      <g>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                      </g>
                    </svg>
                  )}
                </div>
                <span>{lang.language}</span>
              </li>
            ))}
          </ul>
        )}
      </animated.div>
    </DropdownContainer>
  )
}

export default I18nToggle

const DropdownContainer = styled.div`
  position: relative;
  .dropdown-menu {
    list-style: none;
    position: absolute;
    // top: 26px;
    right: -14px;
    background-color: var(--gatsby-colors-background-muted);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    min-width: 170px;
    max-height: 320px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .dropdown-menu-item {
    display: flex;
    align-items: center;
    margin: 4px;
    padding: 10px 5px;
    color: var(--gatsby-colors-text-primary);
    opacity: 0.8;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;
    &:hover {
      opacity: 1;
      background-color: var(--gatsby-colors-background-section);
    }
    .selected {
      width: 24px;
      height: 24px;
      margin-right: 16px;
      opacity: 0.8;
      svg {
        fill: var(--gatsby-colors-text-primary);
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`

const IconWrapper = styled.button`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 35px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: var(--gatsby-colors-text-primary);
  }
  .dropdown {
    stroke: var(--gatsby-colors-text-primary);
  }
`
