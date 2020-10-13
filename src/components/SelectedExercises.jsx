import React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import minus from "./../assets/minus-circle.svg"
import ListedItem from "./ListedItem"
const SortableItem = SortableElement(({ value, removeExercise, disabled }) => (
  <ListedItem
    name={value.name}
    id={value.id}
    onClick={() => removeExercise(value.id)}
    img={minus}
  />
))
const SortableList = SortableContainer(
  ({ items, removeExercise, isDisabled }) => (
    <ul>
      {items.map((value, i) => (
        <SortableItem
          key={`item-${i}`}
          i={i}
          index={i}
          value={value}
          removeExercise={removeExercise}
          disabled={isDisabled}
        />
      ))}
    </ul>
  )
)
const SelectedExercises = ({
  exercises,
  onSortEnd,
  removeExercise,
  isDisabled,
}) => {
  return (
    <SortableList
      distance={1}
      items={exercises}
      onSortEnd={onSortEnd}
      removeExercise={removeExercise}
      isDisabled={isDisabled}
    />
  )
}

export default SelectedExercises
