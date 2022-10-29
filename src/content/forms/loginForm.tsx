// Import the required libraries and functions
import axiosInstance from "../../utils/axiosInstance"
import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/store"
import { initiateLogin, login, logout } from "../../redux/reducers/user"


// Component that builds the login form
export const LoginForm: FC = () => {

  // Initialize the TS pattern structure for our form data
  interface InitialFormDataTypes {
    email: string
    password: string
  }

  // Initialize the token response structure
  interface TokenSuccessResponse {
    config: Object
    data: {
      access: string
      refresh: string
    }
    headers: Object
    request: XMLHttpRequest
    status: number
    statusText: string
  }

  // Initialize the token response structure
  interface UserObjectResponse {
    config: Object
    data: {
      id: number
      email: string
      username: string
      first_name: string
      last_name: string
      full_name: string
    }
    headers: Object
    request: XMLHttpRequest
    status: number
    statusText: string
  }



  // Initialize the `dispatch` function
  const dispatch = useAppDispatch()

  // Initialize the `navigate` function
  const navigate = useNavigate()


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
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Set the user status to `loading`
    dispatch(initiateLogin())

    // Send the login information to the server to get a valid token
    axiosInstance
      .post("accounts/token/", loginData)
      .then((res: TokenSuccessResponse) => {

        // Set the various cookies to local storage values
        localStorage.setItem("access_token", res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)

        // IMPORTANT !!!
        // Update the `axios` instance with the user access token
        axiosInstance.defaults.headers["Authorization"] = "JWT " + res.data.access
      })

      .then(() => {
        // Check for a missing `access_token` in localStorage
        if (!localStorage.getItem("access_token")) {
          // Raise an error if the token was not set
          return Promise.reject("No user token")
        }

        // Get the user based on their token
        return axiosInstance.get("accounts/user/")
      })

      .then((res: UserObjectResponse) => {
        // Update the REDUX state with the user object
        dispatch(login(res.data))

        // Once all login methods are complete, navigate to the home page
        navigate("/")
      })

      // Catch any errors that occur in the login process
      .catch((err: any) => {
        console.log(`Error in login with ${err}`)

        // If any error occurs, return all STATE slices back to their initial states
        dispatch(logout())
      })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" value={loginData.email} onChange={e => handleChange(e)} required />
      <br />
      <label htmlFor="username">Password</label>
      <input type="password" name="password" value={loginData.password} onChange={e => handleChange(e)} required />
      <br />
      <div className="submit-button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}