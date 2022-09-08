import { createSlice } from "@reduxjs/toolkit"

// Initialize the REDUX state values
const initialState = { email: "", username: "", }

const userSlice = createSlice({

  // This will be the name accessible within the store
  name: "user",

  // Sets the initial values of the state
  initialState: { value: initialState },

  // Functions consumed by the reducer to alter the STATE
  // values within our REDUX store for `user`
  reducers: {

    // Functions that changes the STATE values, i.e. `login`
    login: (state, action) => {

      // Take the payload and update the STATE values
      state.value = action.payload
    },

    logout: (state, action) => {
      state.value = initialState
    }
  }
})


// Export the action keywords to call different actions
export const { login, logout } = userSlice.actions

// Pass back ONLY the reducer portion of the slice, NOT the whole function
export default userSlice.reducer