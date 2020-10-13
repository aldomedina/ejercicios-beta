export const compare = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()

  let comparison = 0
  if (nameA > nameB) {
    comparison = 1
  } else if (nameA < nameB) {
    comparison = -1
  }
  return comparison
}

export const formatTime = secs => {
  var minutes = Math.floor(secs / 60)
  var seconds = secs - minutes * 60
  return `${!minutes ? "00" : minutes < 10 ? `0${minutes}` : minutes}:${
    !seconds ? "00" : seconds < 10 ? `0${seconds}` : seconds
  }`
}
