// Import the required libraries and functions
import { ChangeEvent, FC, FormEvent, useState } from "react"

import axiosInstance from "../../utils/axiosInstance"


// Component that builds the login form
export const LoginForm: FC = () => {

  // Initialize the TS pattern structure for our form data
  interface InitialFormDataTypes {
    email: string
    password: string
  }

  // Set the login variables. Uses `Object.freeze({})` for added security.
  // REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  const initialFormData: InitialFormDataTypes = Object.freeze({
    email: "" as string,
    password: "" as string,
  })

  // Initialize the local STATE values based on the frozen values
  const [loginData, setLoginData] = useState(initialFormData)

  // Function that handles the user entry of data into the form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      // Spread the current values
      ...loginData,

      // Update the current value, trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    })
  }

  // Function that handles when a user submits their login info to the server
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Here is login:", loginData)

    axiosInstance
      .post("accounts/token/", loginData)
      .then((res: any) => { console.log("Did it work?!?!", res) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" value={loginData.email} onChange={e => handleChange(e)} required />
      <label htmlFor="username">Password</label>
      <input type="password" name="password" value={loginData.password} onChange={e => handleChange(e)} required />
      <button type="submit">Submit</button>
    </form>
  )
}