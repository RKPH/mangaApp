import { createSlice } from '@reduxjs/toolkit'

const storedAuth = localStorage.getItem('auth')
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      token: null
    }
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token } = action.payload
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem('auth', JSON.stringify(state))
    },
    registerSuccess: (state, action) => {
      const { token } = action.payload
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem('auth', JSON.stringify(state))
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('auth')
    }
  }
})
export const { loginSuccess, logoutSuccess, registerSuccess } =
  authSlice.actions
export const loginUser = (email, Password) => async (dispatch) => {
  try {
    const response = await fetch(
      'https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UserEmail: email, password: Password })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      return { error: errorData || 'Login failed' } // Return an error object instead of throwing an error
    }

    const data = await response.json()
    console.log(data)
    if (data.token) {
      dispatch(
        loginSuccess({
          token: data.token
        })
      )
      return { success: true }
    } else {
      return { error: 'Login failed: Invalid credentials' }
    }
  } catch (error) {
    console.log('Login failed:', error)
    return { error: error.message || 'Login failed' }
  }
}
export const loginUserWithGoogle = (tokenId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/Login/google?idToken=${tokenId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: tokenId })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      return { error: errorData || 'Register failed' } // Return an error object instead of throwing an error
    }

    const data = await response.json()
    console.log(data)
    if (data.token) {
      dispatch(
        registerSuccess({
          token: data.token
        })
      )
      return { success: true }
    } else {
      return { error: 'Register failed: Invalid credentials' }
    }
  } catch (error) {
    console.log('Register failed:', error)
    return { error: error.message || 'Register failed' }
  }
}
export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      'https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserName: username,
          UserEmail: email,
          password: password
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      return { error: errorData || 'Register failed' } // Return an error object instead of throwing an error
    }

    const data = await response.json()
    console.log(data)
    if (data.token) {
      dispatch(
        registerSuccess({
          token: data.token
        })
      )
      return { success: true }
    } else {
      return { error: 'Register failed: Invalid credentials' }
    }
  } catch (error) {
    console.log('Register failed:', error)
    return { error: error.message || 'Register failed' }
  }
}
export const registerUserWithGoogle = (tokenId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/Register/google?idToken=${tokenId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: tokenId })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      return { error: errorData || 'Register failed' } // Return an error object instead of throwing an error
    }

    const data = await response.json()
    console.log(data)
    if (data.token) {
      dispatch(
        registerSuccess({
          token: data.token
        })
      )
      return { success: true }
    } else {
      return { error: 'Register failed: Invalid credentials' }
    }
  } catch (error) {
    console.log('Register failed:', error)
    return { error: error.message || 'Register failed' }
  }
}

export default authSlice.reducer
