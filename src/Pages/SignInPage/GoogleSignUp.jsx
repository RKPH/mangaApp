import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleSignUp({ responseGoogle }) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onNonOAuthError: (error) => {
      console.log("Google login error:", error);
    },
    onSuccess: async (codeResponse) => {
      console.log("Google login success:", codeResponse);
      try {
        const response = await responseGoogle(codeResponse);
        console.log("Tokens:", response.data);
      } catch (error) {
        console.log("Error processing Google response:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
    },
    ux_mode: "redirect", // Ensure this matches your setup in Google Developer Console
    redirect_uri: "https://manga-app-steel.vercel.app/SigninGoogle", // Ensure this matches your Google API Console redirect URI
  });

  return (
    <div>
      <button
        onClick={() => {
          googleLogin();
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleSignUp;
