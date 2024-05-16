import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, registerUserWithGoogle } from "../../Redux/authSlice";
import { GoogleLogin } from "@react-oauth/google";

import { useGoogleLogin } from "@react-oauth/google";
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email error message

  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/Home");
    }
  }, []);
  const responseGoogle = async (response) => {
    const tokenId = response.credential;
    console.log("token: ", tokenId);
    const result = await dispatch(registerUserWithGoogle(tokenId)); // Dispatch the new action

    if (result.error) {
      setError(result.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      navigate("/Home");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setEmailError("");

    // Check if fields are empty and set the corresponding error messages
    if (!email) setEmailError("Email cannot be empty");

    setTimeout(() => {
      setEmailError("");
    }, 5000);
    if (email && password) {
      // Dispatch loginUser action with email and password
      const result = await dispatch(registerUser(name, email, password));

      if (result.error) {
        setError(result.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        navigate("/Home");
      }
    }
  };
  const register = useGoogleLogin({
    onSuccess: (CodeResponse) => console.log(CodeResponse),
    flow: "implicit",
  });
  return (
    <div className="w-full   flex flex-col justify-center  bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="h-screen w-full flex justify-center lg:px-10 px-4 py-2 bg-custom-image bg-cover bg-center bg-no-repeat">
        {/* Your content here */}

        <form
          onSubmit={handleSubmit}
          className="form bg-white p-8 rounded-xl lg:w-[500px]  w-full h-fit lg:mt-10  "
        >
          {error && <span className="text-red-500 text-base">{error}</span>}
          <div className="flex flex-col r  mb-2">
            <label htmlFor="name" className="text-black font-semibold">
              Username
            </label>
            <div className="inputForm px-2 border border-gray-300 rounded-lg flex items-center transition duration-200 focus-within:border-blue-500">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="input p-2 placeholder-gray-400 outline-none focus:placeholder-opacity-0 flex-1"
                placeholder="Enter your username"
              />
            </div>
            {emailError && (
              <span className="text-red-500 text-base">{emailError}</span>
            )}
          </div>
          <div className="flex flex-col  mb-2">
            <label htmlFor="email" className="text-black font-semibold">
              Email
            </label>
            <div className="inputForm px-2 border border-gray-300 rounded-lg flex items-center transition duration-200 focus-within:border-blue-500">
              <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </svg>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input p-2 placeholder-gray-400 outline-none focus:placeholder-opacity-0 flex-1"
                placeholder="Enter your Email"
              />
            </div>
            {emailError && (
              <span className="text-red-500 text-base">{emailError}</span>
            )}{" "}
          </div>

          <div className="flex flex-col  mb-2">
            <label htmlFor="password" className="text-black font-semibold">
              Password
            </label>
            <div className="inputForm border px-2 border-gray-300 rounded-lg flex items-center transition duration-200 focus-within:border-blue-500">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="input p-2  placeholder-gray-400 outline-none focus:placeholder-opacity-0 flex-1"
                placeholder="Enter your Password"
              />
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg>
            </div>
            {emailError && (
              <span className="text-red-500 text-base">{emailError}</span>
            )}
          </div>

          <div className="flex flex-col  mb-2">
            <label htmlFor="password" className="text-black font-semibold">
              Confirm password
            </label>
            <div className="inputForm border px-2 border-gray-300 rounded-lg flex items-center transition duration-200 focus-within:border-blue-500">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="password"
                className="input p-2  placeholder-gray-400 outline-none focus:placeholder-opacity-0 flex-1"
                placeholder="Enter your Password"
              />
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="button-submit bg-black text-white font-semibold py-2   w-full rounded-lg mt-6 hover:bg-gray-400 transition duration-200"
          >
            Sign up
          </button>
          <p className="text-center text-black text-sm my-3">Or Sign Up With</p>

          <div className="flex gap-4 my-3">
            <GoogleLogin
              onSuccess={(tokenResponse) => {
                responseGoogle(tokenResponse);
                console.log(tokenResponse);
              }}
              width={150}
              height={70}
              size="large"
              text="signup_with"
              onError={() => {
                console.log("Login Failed");
              }}
              render={(renderProps) => (
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    baccgroundColor: "red",
                  }}
                  className="bg-red-400 w-full p-4 gap-3 border border-gray-300 rounded-lg flex items-center justify-center font-semibold"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                </button>
              )}
            />
            {/* <MyCustomButton onClick={() => register()}>
              Login with Google
            </MyCustomButton> */}
            <button className="btn apple w-full p-3 gap-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center font-semibold">
              <svg
                version="1.1"
                height="20"
                width="20"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 22.773 22.773"
                xmlSpace="preserve"
              >
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>{" "}
                    <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>{" "}
                  </g>
                </g>
              </svg>
              Apple
            </button>
          </div>
          <Link to="/login">
            <p className="text-center text-black text-sm my-3">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
