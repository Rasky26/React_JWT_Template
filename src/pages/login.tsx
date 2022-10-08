// Import the required libraries and functions
import { FC } from "react"

// Import the used components
import { LoginForm } from "../content/forms/loginForm"

// Component that builds the login page
export const Login: FC = () => {

  // Build the DOM elements
  return (
    <div>
      <h2>Login page</h2>
      <LoginForm />
    </div>
  )
}