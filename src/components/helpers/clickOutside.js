const clickOutside = (targetElement, handleToggle) => {
  return (e) => {
    const withinBoundaries = e.composedPath().includes(targetElement)
    if (!withinBoundaries) {
      handleToggle()
    }
  }
}

export default clickOutside
