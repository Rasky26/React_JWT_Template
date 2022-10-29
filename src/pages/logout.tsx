// Import the core libraries and functions
import axiosInstance from "../utils/axiosInstance"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/store"

// Import the used components
import { logout } from "../redux/reducers/user"


// Component that handles clearing the credential / authorization of
// the current user and navigates them back to an un-authenticated page
export const Logout: FC = () => {

  // Set the TS structure for the logout response
  interface LogoutResponse {
    config: Object
    data: string
    headers: Object
    request: XMLHttpRequest
    status: number
    statusText: string
  }

  // Set the variable state value response
  type LogoutResponseState = LogoutResponse | null


  // Initialize the dispatch function
  const dispatch = useAppDispatch()

  // Initialize the navigate function
  const navigate = useNavigate()

  // Initialize the logout state object
  const [logoutState, setLogoutState] = useState<LogoutResponseState>(null)

  // On component load, remove all the token information for the current user
  useEffect(() => {
    // Send a request to the server to blacklist the current `refresh` token
    axiosInstance.post("accounts/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
      .then((res: any) => {
        setLogoutState(res)
      })
      .catch((err: any) => {
        console.log(`Error in '/logout' with ${err}`)
      }
      )

    // Remove the current tokens in the `localStorage`
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    // Remove the header values from `axios`
    axiosInstance.defaults.headers["Authorization"] = ""

    // Call the `logout` reducer to reset ALL redux values back to the initial state
    dispatch(logout())
  }, [])


  // Watch for updated local state values.
  // Once a successful logout response is received, navigate the user
  // to a different page
  useEffect(() => {
    // If a successful logout status is returned, navigate the user to a
    // different page
    if (logoutState?.status === 205) {
      // Navigate to the page after 1.5 seconds
      setTimeout(() => {
        // Send the user to the `/login` page
        navigate("/login")
      }, 1500)
    }

    // Listen for changes to the `logoutState` value. Re-run the `useEffect` on change
  }, [logoutState])


  // Build the DOM elements
  return (
    <div>Loggin out...</div>
  )
}