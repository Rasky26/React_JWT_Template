// Import the core libraries and functions
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

// import logger from 'redux-logger'
import { logger } from 'redux-logger'

// Import the core reducer used throughout the App
import rootReducer from './reducers/_root.reducer'


// Initialize the `sagaMiddleware` function
const sagaMiddleware = createSagaMiddleware()

// Apply middleware based on whether the environment running
// is development or production.
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware]

// console.log(`${middlewareList}`)
console.log(typeof (rootReducer), rootReducer)

// Set the core `store` component
const store = configureStore({

  // Pull in the `rootReduer`, which combines all
  // the user-defined reducers together
  reducer: rootReducer,

  // Set the array of middlewares used
  // middleware: [...middlewareList]
  middleware: [...middlewareList],
})

// Make the store function available within the App
export default store