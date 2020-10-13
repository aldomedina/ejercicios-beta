import React from "react"
import styled from "styled-components"

const StyledLi = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  img {
    cursor: pointer;
    margin-left: 15px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`
const ListedItem = ({ name, img, onClick, id }) => {
  return (
    <StyledLi>
      <p>{name}</p>
      <img src={img} onClick={() => onClick(id)} />
    </StyledLi>
  )
}

export default ListedItem
