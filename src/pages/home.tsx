// Import required libraries and functions
import { FC } from "react"

// Import used components
import { Example } from "../content/examples/example"


// Component that displays elements of the home page
export const Home: FC = () => {


  // Build the DOM elements
  return (
    <>
      <h2 className="example-home-page-banner">Home Page!</h2>
      <Example />
    </>
  )
}