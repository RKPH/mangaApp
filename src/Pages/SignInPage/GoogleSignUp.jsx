import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

function GoogleSignUp({ responseGoogle }) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Google login success:", codeResponse);
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
    },
  });

  return (
    <div>
      <button onClick={googleLogin}>Sign in with Google</button>
    </div>
  );
}

GoogleSignUp.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
};

export default GoogleSignUp;
