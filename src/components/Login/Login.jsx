import { Button, Link, Typography } from "@mui/material";

import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { forgotPassword, signIn, signUpProvider } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("userName", false);
  const password = watch("password", false);

  const onSubmit = (event) => {
    signIn(email, password, navigate);
  };
  const handleProviderLogin = () => {
    signUpProvider(navigate);
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="email"
            placeholder="Your email"
            {...register("userName", {
              required: true,
              minLength: 3,
              maxLength: 80,
            })}
          />
        </div>
        {errors.userName && <p>Your user name is invalid</p>}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 3,
            })}
          />
        </div>
        {errors.password && errors.password.length > 8 && (
          <p className="error">Password must be 8 characters</p>
        )}
        {/* <button onClick={handleProviderLogin}>Login with Google</button> */}
        <Button onClick={() => forgotPassword(email)}>Forgot password?</Button>
        <input type="submit" />
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <h5 style={{ font: "Segoe UI", color: "#fff" }}>Need an Account? </h5>
          <Link href="/signup" underline="always" variant="body2">
            {"Register Here"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
