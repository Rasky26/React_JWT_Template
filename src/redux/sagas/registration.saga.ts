// Import the core libraries and functions
import { put, takeLatest } from "redux-saga/effects"

// Import the modified `axios` instance
import axiosInstance from "../../utils/axiosInstance"


// Function that handles the various `registration` dispatch
// calls that are made
function* registerUser(action: any) {
  console.log("ACTION", action)
  try {
    console.log("ACTION", action)
    yield axiosInstance.post("register/", action.payload)

  }
  // Otherwise, set the error to our REDUX state and log to console
  catch (error) {
    console.log(`Error with user registration with ${error}`)
  }

}


// SAGA listener for calls related to registering a new user
function* registrationSaga() {
  yield takeLatest("REGISTER_NEW_USER", registerUser)
}

export default registrationSaga


// import { createSlice } from "@reduxjs/toolkit"

// const registerNewUserSlice = createSlice({
//   name: "REGISTER_NEW_USER",
//   initialState: { value: { email: "", username: "", password: "", } },
//   reducers: {
//     register: (state, action) => { },
//   }
// })