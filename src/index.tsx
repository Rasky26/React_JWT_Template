// Import the core libraries and functions
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

// Import the core `App` component
import App from './App/App'

// Import the redux STORE to make values available
// throughout the App
import store from './redux/store'

// Import the base stylesheet
import './index.css'


// Set the main entry point for building the HTML document
// using React
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// Build the webpage
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
