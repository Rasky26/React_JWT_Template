// Import core libraries and functions
import { configureStore } from "@reduxjs/toolkit"

// Import used reducers
import userReducer from "./reducers/user"


// Create the store that contains all redux STATE values
const store = configureStore({

  // Core reducer that contains all the STATE values
  reducer: {
    user: userReducer,
  },
})


// REF: https://redux.js.org/tutorials/typescript-quick-start#project-setup
//
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store