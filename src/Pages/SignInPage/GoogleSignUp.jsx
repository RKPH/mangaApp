import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice";
//fix
function GoogleSignUp({ responseGoogle }) {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Login Success:", codeResponse);

      // Exchange code for tokens on your backend
      try {
        const response = await axios.post(
          "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Auth/Login/google",
          {
            idToken: codeResponse.id_token, // Adjust this based on your token response
          }
        );

        if (response.data.token) {
          dispatch(loginSuccess({ token: response.data.token }));
          responseGoogle(codeResponse); // Optional: Notify parent component
        } else {
          console.error("Failed to obtain token from backend");
        }
      } catch (error) {
        console.error("Error exchanging code for tokens:", error);
        // Handle error appropriately
      }
    },
    onError: (errorResponse) => {
      console.log("Login Failed:", errorResponse);
      // Handle error appropriately
    },
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: "https://manga-app-steel.vercel.app/Signin", // Ensure this matches your Google API Console redirect URI
  });

  return (
    <div className="w-full flex flex-row gap-4 my-6 items-center justify-center">
      <button onClick={() => login()} className="google-login-button">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google Logo"
          style={{ marginRight: "8px" }}
        />
        Sign in with Google
      </button>
    </div>
  );
}

GoogleSignUp.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
};

export default GoogleSignUp;
