// Import the required libraries and functions
import axiosInstance from "../../utils/axiosInstance"
import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


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
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // try {

    //   const response1: TokenSuccessResponse = await axiosInstance.post("accounts/token/", loginData)

    //   console.log("Here is reponse1", response1)

    //   if (response1.statusText !== "OK") {
    //     throw new Error(`HTTP error with: ${response1.status} - ${response1.statusText}`)
    //   }

    //   console.log("Here is reponse1", response1)

    //   const response2: any = await axiosInstance.get("accounts/users/")

    //   console.log("Here is 2:", response2)

    // }

    // catch (error) {
    //   console.error(`Could not login due to error: ${error}`);
    // }
    axiosInstance
      .post("accounts/token/", loginData)
      .then((res: TokenSuccessResponse) => {
        // Set the various cookies to local storage values
        localStorage.setItem("access_token", res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)

        // IMPORTANT !!!
        // Update the `axios` instance with the user access token
        axiosInstance.defaults.headers["Authorization"] = "JWT" + localStorage.getItem("access_token")

        console.log("Set tokens", axiosInstance.defaults.headers["Authorization"])

        navigate("/")
      })
      // .then(axiosInstance.get("accounts/users/")
      //   .then((res2: any) => {
      //     console.log("This is res2", res2)
      //   }))
      .catch((err: any) => console.log(`Error in login with ${err}`))
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