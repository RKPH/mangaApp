import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

function GoogleSignUp({ responseGoogle }) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      responseGoogle(codeResponse);
      console.log("Login Success:", codeResponse);
    },
    onError: () => {
      console.log("Login Failed");
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
