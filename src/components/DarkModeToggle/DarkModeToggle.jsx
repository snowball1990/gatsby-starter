import React, { useEffect } from "react"
import styled from 'styled-components'
import { ThemeContext } from '@/contexts/ThemeContext';

const DarkModeToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const isDark = colorMode === "dark"

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
      const prefersColorSchemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      )
      const SwitchColorMode = e => {
        const mode = e.matches ? "dark" : "light"
        setColorMode(mode)
        document.documentElement.setAttribute("data-theme", mode)
      }
      prefersColorSchemeDark.addListener(SwitchColorMode)
      return () => {
        prefersColorSchemeDark.removeListener(SwitchColorMode)
      }
    }
  }, [])

  // 防止页面重新加载时出现动画问题
  if (!colorMode) {
    return null;
  }

  const toggleColorMode = event => {
    const mode = isDark ? "light" : "dark"
    event.preventDefault()
    setColorMode(mode)
    document.documentElement.setAttribute("data-theme", mode)
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  )
}

export default DarkModeToggle

const IconWrapper = styled.button`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid var(--gatsby-colors-text-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    var(--gatsby-colors-text-primary);
  background: var(--gatsby-colors-text-primary);
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid var(--gatsby-colors-text-primary);
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--gatsby-colors-text-primary),
      0 23px 0 var(--gatsby-colors-text-primary),
      23px 0 0 var(--gatsby-colors-text-primary),
      -23px 0 0 var(--gatsby-colors-text-primary),
      15px 15px 0 var(--gatsby-colors-text-primary),
      -15px 15px 0 var(--gatsby-colors-text-primary),
      15px -15px 0 var(--gatsby-colors-text-primary),
      -15px -15px 0 var(--gatsby-colors-text-primary);
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`

const MoonMask = styled.div`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: var(--gatsby-colors-background-primary);
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: background 0.25s var(--gatsby-transition-ease-in-out-quad), color 0.25s var(--gatsby-transition-ease-in-out-quad),transform 0.45s ease;
`