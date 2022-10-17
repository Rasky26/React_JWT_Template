// Import required libraries and functions
import { FC } from "react"

// Import the used components
import { LoginButton } from "../../components/contentSpecific/header/LoginButton"
import { LogoutButton } from "../../components/contentSpecific/header/LogoutButton"


// Component that builds the App header bar
export const Header: FC = () => {



  return (
    <section>

      <h1>Header Bar</h1>

      <div>
        <LoginButton />
      </div>

      <div>
        <LogoutButton />
      </div>

    </section>
  )
}