import React, { useEffect, useCallback, useRef } from "react"
import { useTransition, animated as a } from "react-spring"
import styled from "styled-components"
import { colors } from "./colors"

const Value = styled.div`
  position: relative;
  overflow: hidden;
  height: 140px;
  width: 200px;
  box-shadow: 0px 20px 40px -10px rgba(20, 171, 218, 0.2);
  background: yellow;

  div {
    background: black;
    color: ${colors.grey};
    position: absolute;
    width: 200px;
    height: 140px;
    text-align: center;
    font-size: 5em;
    font-weight: 200;
    will-change: transform;
  }
`
const NumChanger = ({ number }) => {
  const previous = useRef(number)
  useEffect(() => void (previous.current = number))

  const dir = useCallback((num, prev) => {
    console.log("here")
    return `translate3d(0, ${105 * (num < prev ? 1 : num > prev ? -1 : 0)}%, 0)`
  }, [])
  const transitions = useTransition(number, item => item, {
    from: item => ({ opacity: 0, transform: dir(item, previous.current) }), // diff between retained and previous number
    enter: item => ({ opacity: 1, transform: dir() }), // 0
    leave: item => ({ opacity: 0, transform: dir(item, number) }), // diff between retained and current number
  })
  return (
    <Value>
      {transitions.map(({ item, props, key }) => {
        return <a.div key={key} style={props} children={item} />
      })}
    </Value>
  )
}

export default NumChanger
