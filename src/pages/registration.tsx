// Accessed via `/registration` URL

// Import the core libraries and functions
import { FC } from "react"

// Import the used content
import { RegisterNewUserForm } from "../content/forms/registerNewUserForm"


// Component that handles the registration of a new user
export const Registration: FC = () => {

  // Build the DOM elements
  return (
    <div>
      <h2>In here?</h2>
      <RegisterNewUserForm />
    </div>
  )

}