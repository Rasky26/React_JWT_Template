// Import the core libraries and functions
import axiosInstance from "../../utils/axiosInstance"
import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


// Component that handles the user registration form
// on the DOM
export const RegisterNewUserForm: FC = () => {


  // Initialize the TS pattern structure for our form data
  interface FormDataTypes {
    email: string
    username: string
    password: string
  }


  // Initialize the `navigate` function
  const navigate = useNavigate()


  // Set the registration variables. Uses `Object.freeze({})`
  // for added security.
  // REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  const initialFormData: FormDataTypes = Object.freeze({
    email: "" as string,
    username: "" as string,
    password: "" as string,
  })


  // Initialize the local STATE values based on the frozen values
  const [registrationData, setRegistrationData] = useState(initialFormData)


  // Function that handles the user entry of data into the form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      // Spread the current values
      ...registrationData,

      // Update the current value, trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    })
  }


  // Function that handles submitting the registration information to
  // the server
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent the page reload on submit
    e.preventDefault()

    // Send the new user registration information to the server
    axiosInstance
      .post("accounts/register/", {
        email: registrationData.email,
        username: registrationData.username,
        password: registrationData.password,
      })
      .then((res: any) => {
        console.log("Res is:", res)
        console.log("...with", res.data)
        navigate("/login")
      })
      .catch((err: any) => {
        console.log(`Error in registration with ${err}`)
        setRegistrationData({
          ...registrationData,
          // Reset `username` and `password` to blank
          username: "",
          password: ""
        })
      })
  }

  // Build the DOM elements
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" value={registrationData.email} onChange={e => handleChange(e)} required />
      <br />
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={registrationData.username} onChange={e => handleChange(e)} required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={registrationData.password} onChange={e => handleChange(e)} required />
      <br />
      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}