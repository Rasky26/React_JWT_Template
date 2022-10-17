// Import required libraries and functions
import { FC, MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"


// Component that creates the `Login` button and navigation
export const RegistrationButton: FC = () => {


    // Initialize the `navigate` function
    const navigate = useNavigate()

    // Click handler that navigates the user to the `login` page
    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {

        // Navigate the user to the `/login` page
        navigate("/registration")
    }

    // Build the DOM elements
    return (
        <button onClick={handleClick}>Register</button>
    )
}