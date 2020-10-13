import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import Time from "./Time"
import BigButton from "./BigButton"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background: ${props => (props.isRest ? "lightgreen" : "transparent")};
`

const Timer = ({ settings }) => {
  const { duration, series, rest, exercises } = settings

  const [pause, setPause] = useState(true)
  const [first, setFirst] = useState(true)
  const [finish, setFinish] = useState(false)
  const [isRest, setIsRest] = useState(true)
  const [time, setTime] = useState(3)
  const [remainingSeries, setRemainingSeries] = useState(series)
  const [activeExercise, setActiveExercise] = useState(0)

  const next = () => {
    const lastExercise = activeExercise + 1 === exercises.length
    if (lastExercise && remainingSeries === 0) {
      setFinish(true)
    } else {
      if (first) {
        setFirst(false)
      }
      if (isRest) {
        setTime(duration)
      } else {
        setTime(rest)
        let nextEx = lastExercise ? 0 : activeExercise + 1
        setActiveExercise(nextEx)
        lastExercise && setRemainingSeries(s => s - 1)
      }
      setIsRest(rest => !rest)
    }
  }

  return (
    <Wrapper isRest={isRest}>
      {finish ? (
        <h1 style={{ fontSize: "10rem" }}>FINISH</h1>
      ) : (
        <>
          <Time next={next} paused={pause} totalSeconds={time} />
          <h2 style={{ margin: "2rem 0", textTransform: "uppercase" }}>
            {isRest && !first && "next: "}
            {!first && exercises[activeExercise].name}
            &nbsp; &nbsp; remaing series: {remainingSeries}
          </h2>
        </>
      )}
      <BigButton
        onClick={() => (finish ? navigate("/settings") : setPause(!pause))}
        text={finish ? "go back" : first ? "begin" : pause ? "play" : "pause"}
      />
    </Wrapper>
  )
}

export default Timer
