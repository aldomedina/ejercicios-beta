import React from "react"
import { useSpring, a } from "react-spring"
import { useDrag } from "react-use-gesture"
import styled from "styled-components"

const Container = styled(a.div)`
  position: relative;

  display: grid;
  align-items: center;
  min-width: 150px;
  min-height: 30px;
  margin-bottom: 45px;
`
const Fixed = styled(a.div)`
  background: lightgreen;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`
const Slide = styled(a.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  padding: 15px 15px;
  background-color: hotpink;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
`

const Slider = ({ children }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ down, movement: [mx] }) => set({ x: down ? mx : 0 }),
    { axis: "x" }
  )

  return (
    <Container>
      <Fixed />
      <Slide {...bind()} style={{ x }}>
        {children}
      </Slide>
    </Container>
  )
}

export default Slider
