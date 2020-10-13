import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import arrayMove from "array-move"
import Select from "./../components/Select"

import data from "./../data/exercises.json"
import Controller from "../components/Controller"
import Layout from "../components/Layout"
import { compare, formatTime } from "../components/common"
import SelectedExercises from "../components/SelectedExercises"
import TailList from "../components/TailList"

const options = [
  { value: "arms", label: "Arms" },
  { value: "legs", label: "Legs" },
  { value: "abs", label: "Abs" },
  { value: "cardio", label: "Cardio" },
]

const Settings = () => {
  const [exercises, setExercises] = useState([])
  const [selected, setSelected] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [totalDuration, setTotalDuration] = useState("")
  const [interval, setInterval] = useState({
    duration: 60,
    series: 3,
    rest: 30,
  })

  useEffect(() => {
    if (data && data.length) {
      setExercises(data.map(ex => ({ ...ex, isDisplayed: true })))
    }
  }, [])

  // Handle Filtering
  const handleFilters = (e, a) => {
    const { action } = a
    if (action === "select-option") {
      setActiveFilters([...activeFilters, a.option.value])
    } else if (action === "remove-value") {
      setActiveFilters(activeFilters.filter(el => el !== a.removedValue.value))
    } else if (action === "clear") {
      setActiveFilters([])
    }
  }

  useEffect(() => {
    if (exercises.length) {
      if (!!activeFilters.length) {
        setExercises(
          exercises.map(e => {
            let hasFilter = activeFilters
              .map(filter => !!e[filter])
              .some(el => !!el)
            return {
              ...e,
              isDisplayed: hasFilter,
            }
          })
        )
      } else {
        setExercises(exercises.map(el => ({ ...el, isDisplayed: true })))
      }
    }
  }, [activeFilters])

  // Handle Selection
  const handleSelectExercise = id => {
    const selectedExercise = exercises.find(el => el.id === id)
    setSelected([...selected, selectedExercise])
    const copy = [...exercises].filter(el => el.id !== id)
    setExercises(copy)
  }
  const removeExercise = id => {
    const selectedExercise = selected.find(el => el.id === id)
    console.log(selectedExercise)
    setExercises([...exercises, selectedExercise])
    const copy = [...selected].filter(el => el.id !== id)
    setSelected(copy)
  }
  // Handle Re-sort
  const onSortEnd = ({ oldIndex, newIndex }) =>
    setSelected(selected => arrayMove(selected, oldIndex, newIndex))

  useEffect(() => {
    const { duration, series, rest } = interval
    const serieTime = (duration + rest) * selected.length
    setTotalDuration(serieTime * series)
  }, [interval, selected])

  // Handle Start
  const handleStart = () => {
    const { duration, series, rest } = interval
    if (!!duration && !!series && !!rest && !!selected.length)
      navigate("/session", {
        state: {
          ...interval,
          exercises: selected,
        },
      })
  }

  return (
    <Layout>
      <div>
        <h1>SETTINGS</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "3rem" }}>
          <h3>Exercises</h3>
          <div>
            <Select
              isMulti
              options={options}
              onChange={(e, a) => handleFilters(e, a)}
              placeholder={"Filter by"}
            />
          </div>
          <TailList
            data={exercises.sort(compare).filter(el => !!el.isDisplayed)}
            onButtonClick={handleSelectExercise}
            isPlus
          />
        </div>
        <div
          style={{
            marginRight: "3rem",
          }}
        >
          <h3>Selected Exercises</h3>

          <SelectedExercises
            exercises={selected}
            onSortEnd={onSortEnd}
            removeExercise={removeExercise}
          />
        </div>
        <div>
          <h3>Intervals</h3>
          <div style={{ border: "1px solid", display: "flex" }}>
            {Object.keys(interval).map(key => (
              <Controller
                text={key}
                value={interval[key]}
                handleChange={value =>
                  setInterval({ ...interval, [key]: value })
                }
                modifier={key !== "series" ? 5 : 1}
              />
            ))}
          </div>
          <div>total duration: {formatTime(totalDuration)}</div>
          <button onClick={handleStart}>Start</button>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
