import React from "react"
import styled from "styled-components"
import NumChanger from "./NumChanger"
import up from "./../assets/chevron-up.svg"
import down from "./../assets/chevron-down.svg"
const StyledController = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  width: 200px;

  div {
    display: flex;
    justify-content: center;
  }
  &:last-child {
    border-right: none;
  }
`
const Buttons = styled.div`
  display: flex;
  border-top: 1px solid;
  border-bottom: 1px solid;
  button {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    &:first-child {
      border-right: 1px solid;
    }
    &:focus {
      outline: none;
      outline-offset: none;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`

const Controller = ({ handleChange, value, text, modifier = 1 }) => {
  return (
    <StyledController>
      <div>
        <p>{text}</p>
      </div>
      <Buttons>
        <button onClick={() => handleChange(value + modifier)}>
          <img src={up} alt="add" />
        </button>
        <button
          onClick={() =>
            value > modifier
              ? handleChange(value - modifier)
              : handleChange(value)
          }
        >
          <img src={down} alt="substract" />
        </button>
      </Buttons>
      <NumChanger number={value} />
    </StyledController>
  )
}

export default Controller
