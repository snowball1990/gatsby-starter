import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */

  body {
    // Mobile Safari automatically scales text 
    // https://stackoverflow.com/questions/3226001/some-font-sizes-rendered-larger-on-safari-iphone
    -webkit-text-size-adjust: none;
    color: var(--gatsby-colors-text-primary);
    transition: background 0.25s var(--gatsby-transition-ease-in-out-quad), color 0.25s var(--gatsby-transition-ease-in-out-quad);
  }

  @font-face {
    font-family: "SF Pro SC","SF Pro Display","PingFang SC","Hiragino Sans GB","Microsoft YaHei",
    "Helvetica Neue","Helvetica","Ubuntu","Roboto","Noto","Segoe UI",Arial,sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-display: block;
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  body {
    font-family: "SF Pro SC","SF Pro Display","PingFang SC","Hiragino Sans GB","Microsoft YaHei",
    "Helvetica Neue","Helvetica","Ubuntu","Roboto","Noto","Segoe UI",Arial,sans-serif;
    font-size: 1.6rem;
    margin: 0;
    font-weight: 400;
    height: 100%;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:focus {
    outline: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  input,
  textarea,
  select,
  button {
    font-family: "SF Pro SC","SF Pro Display","PingFang SC","Hiragino Sans GB","Microsoft YaHei",
    "Helvetica Neue","Helvetica","Ubuntu","Roboto","Noto","Segoe UI",Arial,sans-serif;
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none;
  }

  details {
    display: block;
  }

  input {
    &:focus,
    &:active {
      outline: none;
    }

    &[type="number"] {
      width: auto;
    }
  }
`;

export default GlobalStyles;