import React, { useEffect, useState } from "react"
import { createGlobalStyle } from "styled-components"
import { colors } from "./colors"

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
  html, body, #___gatsby, #gatsby-focus-wrapper {
    margin: 0;
    padding: 0;
    height:  ${props => `${props.h}px`}
    
  }
  body {
    font-family: 'Poppins';
    background: ${colors.grey};
  }
  h1,h2,h3,h4,p,ul,li {
    margin: 0;
    padding: 0;
    list-style: none;    
  }
`
const Layout = ({ children }) => {
  const [h, setH] = useState(0)
  useEffect(() => {
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    setH(height)
  }, [])
  return (
    <>
      <GlobalStyle h={h} />
      {children}
    </>
  )
}

export default Layout
