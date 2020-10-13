import React from "react"
import styled from "styled-components"
import { compare } from "../components/common"

const Exercises = styled.ul`
  list-style: none;
  li {
    margin: 10px;
    label {
      cursor: pointer;
      margin: 0 10px;
      user-select: none;
    }
  }
`

const ExerciseList = ({ data, handleSelectExercise }) => {
  if (!data || !data.length) return null
  return (
    <Exercises>
      {data
        .sort(compare)
        .filter(el => !!el.isDisplayed)
        .map((el, index) => (
          <li
            key={`listed-exercises-${index}`}
            onClick={() => handleSelectExercise(index)}
          >
            {el.name}
          </li>
        ))}
    </Exercises>
  )
}

export default ExerciseList
