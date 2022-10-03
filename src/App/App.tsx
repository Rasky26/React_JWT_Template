// Import the core libraries and functions
import { HashRouter as Router } from "react-router-dom"

// Import universal components that will be shown on
// ALL pages throughout the App
import { Header } from "../content/header/Header"

// Import the used components
import RouteProvider from "./PageRoutes/RouteProvider"

// Import the used stylesheet
import "./App.css"


function App() {
  return (

    // Sets the `HashRouter` (renamed as `Router`)
    <Router>

      {/* Component that builds on ALL pages regardless of route */}
      {/* EXAMPLE: Headers, Footers, NavBars, etc. */}
      <Header />


      {/* Component that contains ROUTE-SPECIFIC pages */}
      {/* EXAMPLE: Home, About, Product-Details */}
      <RouteProvider />

    </Router>
  )
}

export default App