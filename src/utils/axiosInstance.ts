// Import the core libraries and functions
import axios from "axios"


// Base URL to access the server
const baseURL: string = "http://127.0.0.1:8000/"

// Relative URL to the refresh token URL
const refreshTokenURL: string = "accounts/token/refresh/"

// URL redirect path for invalid / expired `refresh_token`
const expiredTokenRedirectURL: string = "/login"

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
      // Authorization: localStorage.getItem("access_token") ?
      //   "JWT " + localStorage.getItem("access_token")
      :
      // null, // Would prefer to use `null`, but can not figure out
      //       // how to make it work with TypeScript

      "", // Using blank for now...

    "Content-Type": "application/json",
    accept: "application/json",
  }
})


// Intercepter that updates an expired `access` token using the `refresh` token.
//
// Official `axios` doc: https://axios-http.com/docs/interceptors
//
// REF: https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-JWT-Part-3/blob/master/react/blogapi/src/axios.js
// Linked from: https://www.youtube.com/watch?v=AfYfvjP1hK8&list=PLOLrQ9Pn6caw0PjVwymNc64NkUNbZlhFw&index=7
axiosInstance.interceptors.response.use(
  (response: any) => {
    // If there are no errors, allow `axios` process to continue
    return response
  },

  // Any status codes that falls outside the range of 2xx cause this function to trigger.
  // Either attempt to refresh the `access` and `refresh` tokens, OR return the user to a
  // different route (initially set to "/login/")
  async function (error: any) {
    const originalRequest = error.config;

    // Checks if unable to connect to the server
    // (or for any other `undefined` response)
    if (typeof error.response === 'undefined') {
      alert(
        `--- axiosInstance.ts ---
        
        A server/network error occurred.
        Looks like CORS might be the problem.
        Sorry about this - we will get it fixed shortly.
        `
      )

      return Promise.reject(error)
    }

    // Protection from creating a loop that infinity
    // calls the refresh URL route
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + refreshTokenURL
    ) {
      // Navigates the user to an un-authenticated page (currently set to "/login/")
      window.location.href = expiredTokenRedirectURL
      return Promise.reject(error)
    }

    // Check if all error responses are `true`, then inverse the result
    if (! // Use a `NOT` operator
      [
        error.response.data.code === 'token_not_valid',
        error.response.status === 401,
        error.response.statusText === 'Unauthorized',
      ].every(Boolean)
    ) {

      // The specific error handling should be done elsewhere
      return Promise.reject(error)
    }

    // Get the stored `refresh_token` from localStorage
    const refreshToken: string | null = localStorage.getItem('refresh_token')

    // If a `refresh_token` is blank or undefined, navigate
    // the user back to the login page
    if (!refreshToken) {
      console.log(
        `axiosInstance.ts
        
        Refresh token unavailable:
        --> Token: ${refreshToken}`
      )
      // Redirect un-authenticated users
      window.location.href = expiredTokenRedirectURL
      return
    }

    // Takes the `refresh_token`, splits it on the `.` character, decodes it from
    // the current "base64url", and finally convert it to a standard JSON format.
    //
    // Once decoded, the JSON format will look like (EXAMPLE!!!):
    // {
    //   token_type: 'refresh',
    //   exp: 1666729294,
    //   iat: 1665865294,
    //   jti: '7dd5e6c48df942abb60d4b2e19e58b44',
    //   user_id: 2
    // }
    //
    // Need to use `toString()` to keep typescript happy...
    const tokenParts = JSON.parse(Buffer.from(refreshToken.split('.')[1], "base64url").toString())

    // Get the current datetime as an integer representation
    const now: number = Math.ceil(Date.now() / 1000)

    // Compare the token's expiration date against the current datetime.
    // If the expiration date is less (earlier) than the current date, the
    // session is expired.
    if (tokenParts.exp < now) {
      console.log(
        `
        axiosInstance.ts

        Refresh token is expired!'
        Token expiration: ${new Date(tokenParts.exp * 1000)}
        Current datetime: ${new Date(now * 1000)}
        `
      )
      // Redirect users with expired tokens
      window.location.href = expiredTokenRedirectURL
      return
    }

    // As long as the expiration date is later than the current date
    // then both the `access` and `refresh` tokens can be updated
    return axiosInstance
      .post(refreshTokenURL, { refresh: refreshToken })
      .then((response: any) => {

        // Update the tokens in `localStorage`
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem("refresh_token", response.data.refresh)

        // Update the axios headers with the new token
        axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access
        originalRequest.headers["Authorization"] = "JWT " + response.data.access

        return axiosInstance(originalRequest)
      })

      // Catch any errors the URL
      .catch((err: any) => {
        console.log(`Error with refreshing the token with: ${err}`)
      })
  }
)


// -------------------------------------------------------------
//
// Un-modified version -- copy/paste from:
// https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-JWT-Part-3/blob/master/react/blogapi/src/axios.js
//
// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;

// 		if (typeof error.response === 'undefined') {
// 			alert(
// 				'A server/network error occurred. ' +
// 					'Looks like CORS might be the problem. ' +
// 					'Sorry about this - we will get it fixed shortly.'
// 			);
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 401 &&
// 			originalRequest.url === baseURL + 'token/refresh/'
// 		) {
// 			window.location.href = '/login/';
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.data.code === 'token_not_valid' &&
// 			error.response.status === 401 &&
// 			error.response.statusText === 'Unauthorized'
// 		) {
// 			const refreshToken = localStorage.getItem('refresh_token');

// 			if (refreshToken) {
// 				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

// 				// exp date in token is expressed in seconds, while now() returns milliseconds:
// 				const now = Math.ceil(Date.now() / 1000);
// 				console.log(tokenParts.exp);

// 				if (tokenParts.exp > now) {
// 					return axiosInstance
// 						.post('/token/refresh/', { refresh: refreshToken })
// 						.then((response) => {
// 							localStorage.setItem('access_token', response.data.access);
// 							localStorage.setItem('refresh_token', response.data.refresh);

// 							axiosInstance.defaults.headers['Authorization'] =
// 								'JWT ' + response.data.access;
// 							originalRequest.headers['Authorization'] =
// 								'JWT ' + response.data.access;

// 							return axiosInstance(originalRequest);
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				} else {
// 					console.log('Refresh token is expired', tokenParts.exp, now);
// 					window.location.href = '/login/';
// 				}
// 			} else {
// 				console.log('Refresh token not available.');
// 				window.location.href = '/login/';
// 			}
// 		}

// 		// specific error handling done elsewhere
// 		return Promise.reject(error);
// 	}
// );


export default axiosInstance