import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Async thunk to update user data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userID, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/Update/${userID}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default userSlice.reducer
