const debounce = (func, timeout = 500) => {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arg)
    }, timeout)
  }
}

export default debounce
