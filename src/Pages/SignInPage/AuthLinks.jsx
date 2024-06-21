import React from "react";
import { Link } from "react-router-dom";

function AuthLinks() {
  return (
    <Link to="/login">
      <p className="text-center text-black text-sm my-3">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer">Login</span>
      </p>
    </Link>
  );
}

export default AuthLinks;
