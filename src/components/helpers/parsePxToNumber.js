const parsePxToNumber = (value) => {
  const CUT_PX_STRING = 3
  const cutPx = value.slice(0, value.length - CUT_PX_STRING)
  return Number.parseFloat(cutPx)
}

export default parsePxToNumber
