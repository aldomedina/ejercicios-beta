import React from "react"
import plus from "./../assets/plus-circle.svg"
import ListedItem from "./ListedItem"

const TailList = ({ data, onButtonClick }) => {
  return (
    <ul>
      {data.map((el, index) => (
        <ListedItem
          key={`listed-exercises-${index}`}
          name={el.name}
          onClick={onButtonClick}
          img={plus}
          id={el.id}
        />
      ))}
    </ul>
  )
}

export default TailList
