// Import the core libraries and functions
import { FC } from "react"
import {
  Route,
  Routes // updated from `Switch` in v6
} from "react-router-dom"

// Import the various page views within the App
import { Login } from "../../pages/login"
import { Logout } from "../../pages/logout"
import { Home } from "../../pages/home"
import { Registration } from "../../pages/registration"


// Component that contains all the specific routes a user
// could access (permission-level dependant) and the
// associated page component
export const RouteProvider: FC = () => {

  return (

    // Selects the matching URL route. Links are sorted by reversed alphabetical order.
    // Formerly known as `<Switch>`
    <Routes>

      {/* Route that allows a new user to register an account */}
      <Route path="/registration" element={<Registration />} />

      {/* Route for users to logout */}
      <Route path="/logout" element={<Logout />} />

      {/* Route for users to login */}
      <Route path="/login" element={<Login />} />

      {/* Home page route -- requires valid login token */}
      <Route path="/" element={<Home />} />

    </Routes>
  )
}