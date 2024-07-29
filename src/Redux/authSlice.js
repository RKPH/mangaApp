import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      token: null,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    registerSuccess: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess } =
  authSlice.actions;

export const loginUser = (email, Password) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserEmail: email, password: Password }),
        credentials: "include", // Ensure cookies are included in the request
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return { error: errorData || "Login failed" };
    }

    const data = await response.json();
    console.log(data);
    if (data.token) {
      dispatch(loginSuccess());
      return { success: true };
    } else {
      return { error: "Login failed: Invalid credentials" };
    }
  } catch (error) {
    console.log("Login failed:", error);
    return { error: error.message || "Login failed" };
  }
};

export const loginUserWithGoogle = (tokenId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/Login/google?idToken=${tokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: tokenId }),
        credentials: "include", // Ensure cookies are included in the request
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return { error: errorData || "Login failed" };
    }

    const data = await response.json();
    console.log(data);
    if (data.token) {
      dispatch(registerSuccess());
      return { success: true };
    } else {
      return { error: "Login failed: Invalid credentials" };
    }
  } catch (error) {
    console.log("Login failed:", error);
    return { error: error.message || "Login failed" };
  }
};

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          UserEmail: email,
          password: password,
        }),
        credentials: "include", // Ensure cookies are included in the request
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return { error: errorData || "Register failed" };
    }

    const data = await response.json();
    console.log(data);
    if (data.token) {
      dispatch(registerSuccess());
      return { success: true };
    } else {
      return { error: "Register failed: Invalid credentials" };
    }
  } catch (error) {
    console.log("Register failed:", error);
    return { error: error.message || "Register failed" };
  }
};

export const registerUserWithGoogle = (tokenId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/Register/google?idToken=${tokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: tokenId }),
        credentials: "include", // Ensure cookies are included in the request
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return { error: errorData || "Register failed" };
    }

    const data = await response.json();
    console.log(data);
    if (data.token) {
      dispatch(registerSuccess());
      return { success: true };
    } else {
      return { error: "Register failed: Invalid credentials" };
    }
  } catch (error) {
    console.log("Register failed:", error);
    return { error: error.message || "Register failed" };
  }
};

export default authSlice.reducer;
