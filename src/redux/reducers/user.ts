// Import the core libraries and functions
import { createSlice } from "@reduxjs/toolkit"

// Import the modified `axiosInstance` function
import axiosInstance from "../../utils/axiosInstance"

// Import the various actions utilized
import { registerUser } from "../actions/userActions"


// Initialize the REDUX state values
const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}


const userSlice = createSlice({

  // This will be the name accessible within the store
  name: "user",

  // Sets the initial values of the state
  initialState,

  // Functions consumed by the reducer to alter the STATE
  // values within our REDUX store for `user`
  reducers: {
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
// export const { login, logout, registerNewUser } = userSlice.actions

// Pass back ONLY the reducer portion of the slice, NOT the whole function
export default userSlice.reducer