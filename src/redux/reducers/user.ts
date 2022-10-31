// Import the core libraries and functions
import { createSlice } from "@reduxjs/toolkit"


// State types for a user
interface UserSliceState {
  state: "unathenticated" | "loading" | "authenticated"
  id: null | number
  username?: string
  email?: string
  first_name?: string
  last_name?: string
  full_name?: string
}

// Set the initial state values for user
const initialState: UserSliceState = {
  state: "unathenticated",
  id: null
}


// Create the REDUX store slice for a `user` object
const userSlice = createSlice({

  // This will be the name accessible within the store
  name: "user",

  // Sets the initial values of the state
  initialState: initialState,

  // Functions consumed by the reducer to alter the STATE
  // values within our REDUX store for `user`
  reducers: {

    initiateLogin: (state: UserSliceState) => {
      state.state = "loading"
    },

    login: (state: UserSliceState, action: any) => {
      // Update the `user` state with the user fields and set status to "authenticated"
      return { ...state, ...action.payload, state: "authenticated" }

    },

    // Dispatch call to logout the current user
    logout: (state) => {
      return initialState
    }
  },
  // extraReducers: {
  //   // register user
  //   [registerUser.pending]: (state) => {
  //     state.loading = true
  //     state.error = null
  //   },
  //   [registerUser.fulfilled]: (state, { payload }) => {
  //     state.loading = false
  //     state.success = true // registration successful
  //   },
  //   [registerUser.rejected]: (state, { payload }) => {
  //     state.loading = false
  //     state.error = payload
  //   },
  // },
})


// Export the action keywords to call different actions
export const { initiateLogin, login, logout } = userSlice.actions

// Pass back ONLY the reducer portion of the slice, NOT the whole function
export default userSlice.reducer