import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function GoogleSignUp({ responseGoogle }) {
  return (
    <div className="w-full flex flex-row gap-4 my-6 items-center justify-center">
      <GoogleLogin
        onSuccess={(tokenResponse) => {
          responseGoogle(tokenResponse);
        }}
        type="icon"
        size="large"
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default GoogleSignUp;
