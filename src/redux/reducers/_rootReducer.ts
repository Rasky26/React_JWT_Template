// Import the core libraries and functions
import { combineReducers } from "@reduxjs/toolkit"

// Import the defined reducers
import counterSlice from "./example"
import userReducer from "./user"


export const rootReducer = combineReducers({
  counter: counterSlice,
  user: userReducer
})