import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function GoogleSignUp({ responseGoogle }) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Google login success:", codeResponse);
      await responseGoogle(codeResponse);
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
    },
    ux_mode: "redirect", // Ensure this matches your setup in Google Developer Console
    redirect_uri: "https://manga-app-steel.vercel.app/Signin", // Ensure this matches your Google API Console redirect URI
  });

  const handleGoogleLoginClick = () => {
    console.log("Google login button clicked");
    googleLogin(); // Trigger Google OAuth flow
  };

  return (
    <div>
      <button onClick={handleGoogleLoginClick}>Sign in with Google</button>
    </div>
  );
}

export default GoogleSignUp;
