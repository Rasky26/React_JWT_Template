import axios from "axios"


// Base URL to access the server
const baseURL = "http://127.0.0.1:8000"

// Get the token from localStorage, or undefined if not set
const token: string | null = localStorage.getItem("access_token")

// Create the `axios` object configured for handling,
// passing, and setting credientials for each server call
const axiosInstance: any = axios.create({

  // Set the base URL
  baseURL: baseURL,
  // Timeout length before a URL call is cancelled, in milliseconds
  timeout: 5000,

  // IMPORTANT! -- Set the headers with the credential information
  headers: {
    Authorization: token ?
      "JWT " + token
      :
      // null, // Would prefer to use `null`, but can not figure out
      //       // how to make it work with TypeScript

      "", // Using blank for now...

    "Content-Type": "application/json",
    accept: "application/json",
  }
})

console.log("AXIOS INSTANCE ->>>>>>", axiosInstance)

export default axiosInstance