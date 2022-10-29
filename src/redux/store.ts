// Import core libraries and functions
import logger from "redux-logger"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// Import used reducers
import { rootReducer } from "./reducers/_rootReducer"



// Create the store that contains all redux STATE values
const store = configureStore({

  // Core reducer that contains all the STATE values
  reducer: rootReducer,

  // REF: https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend()
      .concat(logger),
})


// REF: https://redux.js.org/tutorials/typescript-quick-start#project-setup
//
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//
// REF: https://redux.js.org/tutorials/typescript-quick-start#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Make the store values availabe through the App
export default store