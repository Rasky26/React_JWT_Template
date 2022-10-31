import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { logout } from "./user"



// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({

  // The assigned name of the reducer
  name: 'counter',

  // `createSlice` will infer the state type from the `initialState` argument
  // assuming the names exactly match (initialState: initialState)
  initialState,

  // The different actions that can be taken. Previously, used to
  // use a switch-case combo; this is the recommended verison with redux-toolkit
  reducers: {

    // Calling `dispatch(increment())` will reach here and increase the
    // STATE value by one (1)
    increment: state => {
      state.value += 1
    },

    // Calling `dispatch(decrement())` will reach here and reduce the
    // STATE value by one (1)
    decrement: state => {
      state.value -= 1
    },

    // Update the `state.value` from a passed `action.payload` value.
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },

  extraReducers(builder) {
    builder.addCase(logout, state => {
      return initialState
    })
  },
})

// Make the dispatch actions available to be imported
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

// Make the various reducers available to be imported
export default counterSlice.reducer