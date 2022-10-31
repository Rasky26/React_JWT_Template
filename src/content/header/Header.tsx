// Import required libraries and functions
import { FC } from "react"

// Import the typescript guarded `useSelector`
import { useAppSelector as useSelector } from "../../redux/store"

// Import the used components
import { LoginButton } from "../../components/contentSpecific/header/LoginButton"
import { LogoutButton } from "../../components/contentSpecific/header/LogoutButton"
import { UserDisplay } from "../../components/contentSpecific/header/UserDisplay"


// Component that builds the App header bar
export const Header: FC = () => {


  // Get the user from the store
  const user = useSelector(store => store.user)

  return (
    <header>

      <h1>Header Bar</h1>

      <div className="login-logout-container">

        {(user.id && user.full_name) ?
          <>
            {/* Note the exclamation mark in `user.full_name!` */}
            {/* REF: https://stackoverflow.com/a/67229058 */}
            <UserDisplay userFullName={user.full_name!} />
            <LogoutButton />
          </>
          :
          <LoginButton />
        }
      </div>

    </header>
  )
}