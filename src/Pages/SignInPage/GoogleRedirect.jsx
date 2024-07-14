import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUserWithGoogle } from "../../Redux/authSlice";

function SigninGoogle() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      handleGoogleResponse(code);
    }
  }, [location.search]);

  const handleGoogleResponse = async (code) => {
    console.log("Handling Google Sign-in...", code);
    try {
      console.log("Google login success:", code);
      const result = await dispatch(registerUserWithGoogle({ code }));
      console.log("Tokens:", result.data);
      if (result.error) {
        console.error("Error processing Google response:", result.error);
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error processing Google response:", error);
    }
  };

  return (
    <div>
      <p>Handling Google Sign-in...</p>
    </div>
  );
}

export default SigninGoogle;
