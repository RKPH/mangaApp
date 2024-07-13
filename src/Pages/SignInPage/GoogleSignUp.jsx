import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

function GoogleSignUp({ responseGoogle }) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Login Success:", codeResponse);
      if (codeResponse.code) {
        responseGoogle(codeResponse.code); // Pass the token directly
      } else {
        console.error("Google login response missing code:", codeResponse);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: "https://manga-app-steel.vercel.app/Signin", // Ensure this matches your Google API Console redirect URI
  });

  return (
    <div className="w-full flex flex-row gap-4 my-6 items-center justify-center">
      <button
        onClick={() => {
          console.log("Google Sign Up clicked");
          login();
        }}
        className="flex items-center justify-center bg-white dark:bg-[#18191A] border border-gray-300 rounded-lg p-2 text-black dark:text-white cursor-pointer"
      >
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
