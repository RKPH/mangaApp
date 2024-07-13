import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, registerUserWithGoogle } from "../../Redux/authSlice";
import GoogleSignUp from "./GoogleSignUp";
import FormInput from "./FormInput";
import AuthLinks from "./AuthLinks";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/Home");
    }
  }, [auth.isAuthenticated, navigate]);

  const responseGoogle = async (response) => {
    const tokenId = response.code.id_token;
    console.log("log here: ?", tokenId);
    const result = await dispatch(registerUserWithGoogle(tokenId));
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
    event.preventDefault();
    setEmailError("");
    if (!email) setEmailError("Email cannot be empty");
    setTimeout(() => {
      setEmailError("");
    }, 5000);
    if (email && password) {
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

  return (
    <div className="w-full flex flex-col justify-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="h-screen w-full flex justify-center lg:px-10 px-4 py-2 bg-custom-image bg-cover bg-center bg-no-repeat">
        <form
          onSubmit={handleSubmit}
          className="form bg-white p-8 rounded-xl lg:w-[500px] w-full h-fit mt-10"
        >
          {error && <span className="text-red-500 text-base">{error}</span>}
          <FormInput
            label="Username"
            value={name}
            onChange={setName}
            type="text"
            placeholder="Enter your username"
          />
          {emailError && (
            <span className="text-red-500 text-base">{emailError}</span>
          )}
          <FormInput
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="Enter your email"
          />
          <FormInput
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="Enter your password"
          />
          <FormInput
            label="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
            placeholder="Confirm your password"
          />
          <button
            type="submit"
            className="button-submit bg-black text-white font-semibold py-2 w-full rounded-lg mt-6 hover:bg-gray-400 transition duration-200"
          >
            Sign up
          </button>
          <p className="text-center text-black text-sm my-3">Or Sign Up With</p>
          <GoogleSignUp responseGoogle={responseGoogle} />
          <AuthLinks />
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
