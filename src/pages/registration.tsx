// Accessed via `/registration` URL

// Import the core libraries and functions
import React, { useState } from "react"
import { useDispatch } from "react-redux"

// Import the used content
import RegisterNewUserForm from "../content/forms/registerNewUserForm"

// Component that handles the registration of a new user
export default function Registration() {



  return (
    <div>
      <h2>In here?</h2>
      <RegisterNewUserForm />
    </div>
  )

}