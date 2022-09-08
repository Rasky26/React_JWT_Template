// Import core libraries and functions
import { combineReducers } from "@reduxjs/toolkit"

// Import the reducers
import user from "./user.reducer"


// Main reducer that combines all the smaller REDUX reducers
// together and makes them easily available within the `store`
const rootReducer = combineReducers({
  user,
})

// Make the `rootReducer` available within the App
export default rootReducer