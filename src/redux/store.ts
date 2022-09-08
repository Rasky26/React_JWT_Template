// Import core libraries and functions
import { configureStore } from "@reduxjs/toolkit"

// Import used reducers
import userReducer from "./reducers/user.saga"


// Create the store that contains all redux STATE values
const store = configureStore({

  // Core reducer that contains all the STATE values
  reducer: {
    user: userReducer,
  },
})

export default store