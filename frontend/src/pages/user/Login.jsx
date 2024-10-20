import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-sm bg-white mx-auto px-3 sm:p-8 mt-24">
      <h2 className="text-2xl font-semibold">Login</h2>

      <form className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3"
        />
        {
          message && <p className="text-red-500">{message}</p> // Display error message if any
        }
        <button className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
          Login
        </button>
      </form>
      <p className="my-5 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-500 italic">
          Register
        </Link>{" "}
        here.
      </p>
    </div>
  );
};

export default Login;
