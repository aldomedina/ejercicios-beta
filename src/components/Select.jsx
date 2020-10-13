import React from "react"
import Select from "react-select"
import { colors } from "./colors"

const customStyles = {
  control: (state, { isFocused, isSelected }) => ({
    ...state,
    backgroundColor: colors.grey,
    borderRadius: 0,
    borderColor: isFocused || isSelected ? "black" : state.borderColor,
    boxShadow: "none",
    "&:hover": {
      borderColor: "black",
    },
  }),
  menu: (state, { isFocused, isSelected }) => ({
    ...state,
    backgroundColor: colors.grey,
    borderRadius: 0,
    border: "1px solid black",
    boxShadow: "none",
  }),
}

const StyledSelect = props => <Select styles={customStyles} {...props} />

export default StyledSelect
