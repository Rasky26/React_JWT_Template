// Import the core libraries and functions
import { FC } from "react"
import { Link } from "react-router-dom"

// Import the used content
import { RegisterNewUserForm } from "../content/forms/registerNewUserForm"


// Component that handles the registration of a new user
export const Registration: FC = () => {

  // Build the DOM elements
  return (
    <div>

      <h2>Register A New Account</h2>

      <RegisterNewUserForm />

      <Link to="/login">Login to an existing account</Link>

    </div>
  )

}