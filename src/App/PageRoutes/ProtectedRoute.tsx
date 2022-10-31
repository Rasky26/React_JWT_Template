// Import the core libraries and functions
import { Route } from "react-router-dom"


// Set the type-script interface
interface ProtectedRouteFields {
  component: any;
  children: any;
  props: any;
}

// Component that allows specified pages to require
// a valid `user.id` field to access. If the
// field is `undefined`, return the user to `/login`
//
// Page information still needs to be tied to a valid
// JWT token before information is provided.
export default function ProtectedRoute({ component, children, ...props }: ProtectedRouteFields) {


}