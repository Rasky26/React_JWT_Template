// Import the core libraries and functions
import {
  HashRouter as Router,
  Route,
  Routes // updated from `Switch` in v6
} from 'react-router-dom'

// Import the various page views within the App
import HomePage from '../../pages/home'
import Registration from "../../pages/registration"


// Component that contains all the specific routes a user
// could access (permission-level dependant) and the
// associated page component
export default function RouteProvider() {

  return (
    // Sets the `HashRouter` (renamed as `Router`)
    <Router>

      {/* Selects the matching URL route. */}
      {/* Formerly known as `<Switch>` */}
      <Routes>

        {/* Route that allows a new user to register an account */}
        <Route path="/registration" element={<Registration />} />

        {/* Home page route -- requires valid login token */}
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  )
}