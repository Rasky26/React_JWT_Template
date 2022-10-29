// Import the required libraries and functions
import { FC } from "react"
import { Link } from "react-router-dom"

// Import the used components
import { LoginForm } from "../content/forms/loginForm"


// Component that builds the login page
export const Login: FC = () => {

  // Build the DOM elements
  return (
    <div className="example-section">

      <h3>Login</h3>

      <LoginForm />

      <Link to="/registration" className="login-redirect">Register a new account</Link>

    </div>
  )
}