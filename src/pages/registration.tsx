// Import the core libraries and functions
import { FC } from "react"
import { Link } from "react-router-dom"

// Import the used content
import { RegisterNewUserForm } from "../content/forms/registerNewUserForm"


// Component that handles the registration of a new user
export const Registration: FC = () => {

  // Build the DOM elements
  return (
    <section className="example-section">

      <h3>Register A New Account</h3>

      <RegisterNewUserForm />

      <Link to="/login" className="login-redirect">Login to an existing account</Link>

    </section>
  )

}