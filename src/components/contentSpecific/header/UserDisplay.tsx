// Import the core libraries and functions
import { FC } from "react"

// Import the typescript guarded REDUX functions
import { useAppSelector as useSelector } from "../../../redux/store"

type UserType = {
  userFullName: string
}

// Component that handles displaying the user's full name
export const UserDisplay: FC<UserType> = ({ userFullName }) => {

  // Build the DOM elements
  return (
    <span>{userFullName}</span>
  )
}