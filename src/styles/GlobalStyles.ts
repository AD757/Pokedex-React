import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: sans-serif, Helvetica, -apple-system, system-ui;
  }

  html,
  :root {
    font-size: 62.5%;
  }

  html, body {
    background-color: #212121;
    transition: background-color .2s;
  }

  body {  
    font-size: 1.8rem;
    width: 100vw;
    height: 100vh;

    @media (min-width: 1100px) {
      width: 100%;
      height: 100%;
    }
  }

  button {
    cursor: pointer;
    border: 0;
  }

  svg {
    cursor: pointer
  }

  ul {
    list-style:none;
  }

  li {
    list-style-type: none;
    font-size: 3rem;
  }

  a {
    text-decoration:none;
    color: unset;
  }

  @keyframes loadAnimation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
