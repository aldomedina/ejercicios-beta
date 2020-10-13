import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import snap from "./../sounds/snap.mp3"

const StyledTime = styled.div`
  width: 80%;
  font-size: 10rem;
  display: flex;
  align-items: center;
  h1 {
    line-height: 0;
    width: 48%;
    &:first-child {
      text-align: right;
    }
  }
  span {
    width: 4%;
  }
`
const Time = ({ paused, next, totalSeconds }) => {
  const [time, setTime] = useState("")
  const [minutes, setMinutes] = useState("00")
  const [seconds, setSeconds] = useState("00")

  const audioRef = useRef(null)

  useEffect(() => {
    setTime(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      !paused && manageTime(time)
    }, 1000)
    return () => clearInterval(interval)
  }, [time, paused])

  const manageTime = secs => {
    var minutes = Math.floor(secs / 60)
    var seconds = secs - minutes * 60
    time ? setTime(time => time - 1) : next()
    if (secs === 3 || secs === 2 || secs === 1) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
    setMinutes(!minutes ? "00" : minutes < 10 ? `0${minutes}` : minutes)
    setSeconds(!seconds ? "00" : seconds < 10 ? `0${seconds}` : seconds)
  }
  return (
    <StyledTime>
      <h1> {minutes}</h1>
      <span>:</span>
      <h1>{seconds}</h1>
      <audio ref={audioRef} src={snap} type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </StyledTime>
  )
}

export default Time
