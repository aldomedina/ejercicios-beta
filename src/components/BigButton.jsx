import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  font-size: 4rem;
  padding: 1rem 2.5rem;
  border: 1px solid black;
  margin-bottom: 2rem;
  text-transform: uppercase;
  border-radius: 55px;
  background: none;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  &:focus {
    outline: none;
  }
`
const BigButton = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>
}

export default BigButton
