// Reducer that stores the current `user` information
const userReducer = (state = {}, action: { type: string, payload: any }) => {
  switch (action.type) {

    // Set the current user into the REDUX store
    case "SET_USER":
      return action.payload

    // Reset the information to the original state
    case "UNSET_USER":
      return {}

    // Default case returns the current STATE
    default:
      return state
  }
}

// Make the reducer accessible with in the App
export default userReducer