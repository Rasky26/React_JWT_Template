// Import the core libraries and functions
import { all } from "redux-saga/effects"

// Import the user-defined SAGAS
import registrationSaga from "./registration.saga"

// The `rootSaga` packages all the various SAGAS together
// and makes them accessible throughout the app.
//
// `rootSaga` is imported in the `index.ts` file.
export default function* rootSaga() {
  yield all([
    // Contains an array of all the SAGAS that are accessible
    registrationSaga(),
  ])
}