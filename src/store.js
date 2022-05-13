import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerRegister from './components/helpers/reducerRegister'

export const store = configureStore({
  reducer: { ...reducerRegister.reducers },
})

reducerRegister.replaceRootReducer((reducer = {}) => {
  store.replaceReducer(combineReducers({ ...reducer }))
})
