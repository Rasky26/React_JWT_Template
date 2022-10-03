// Import the core libraries and functions
import { createAsyncThunk } from "@reduxjs/toolkit"

// Import `axiosInstance` for using axios
import axiosInstance from "../../utils/axiosInstance"


// userAction.js
export const registerUser = createAsyncThunk(
  // action type string
  'user/register',
  // callback function
  async ({ firstName, email, password, pending }: { firstName: string, email: string, password: string, pending: '' }, { rejectWithValue }) => {

    try {
      // make request to backend
      await axiosInstance.post(
        '/api/user/register',
        { firstName, email, password }
      )

    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

  }
)