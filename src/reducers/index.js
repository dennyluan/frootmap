import { combineReducers } from 'redux'
import mapReducer from 'features/mapSlice'

export default combineReducers({
  map: mapReducer
})
