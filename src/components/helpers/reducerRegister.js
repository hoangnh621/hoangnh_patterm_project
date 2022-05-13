class reducerRegister {
  constructor() {
    this.reducers = {}
    this.emitChange = null
  }

  register(name, reducer) {
    this.reducers = { ...this.reducers, [name]: reducer }
    if (this.emitChange) {
      this.emitChange(this.reducers)
    }
  }

  replaceRootReducer(reducer) {
    this.emitChange = reducer
  }
}

export default new reducerRegister()
