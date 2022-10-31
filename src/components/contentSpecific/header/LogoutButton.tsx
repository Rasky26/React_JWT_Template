// Import the core libraries and functions
import { FC, MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"


export const LogoutButton: FC = () => {

  // Initialize the navigate function
  const navigate = useNavigate()

  // Click handler that navigates the user to the `login` page
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {

    // Send the user to the `/login` page
    navigate("/logout")
  }

  // Build the DOM element
  return (
    <button onClick={handleClick}>Logout</button>
  )
}