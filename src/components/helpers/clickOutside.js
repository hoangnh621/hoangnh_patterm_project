const clickOutside = (targetElement, handleToggle) => {
  console.log('targetElement', targetElement)
  return (e) => {
    console.log('e.composedPath()', e.composedPath())
    const withinBoundaries = e.composedPath().includes(targetElement)
    if (!withinBoundaries) {
      handleToggle()
    }
  }
}

export default clickOutside
