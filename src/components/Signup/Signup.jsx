import { createUser } from "../../auth/firebase";
import React from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { useSelector } from "react-redux";

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const emailAddress = watch("emailAddress", false);
  const userPassword = watch("password", false);
  const firstName = watch("firstName", false);
  const lastName = watch("lastName", false);

  const onSubmit = () => {
    const displayName = `${firstName} ${lastName}`;
    createUser(emailAddress, userPassword, displayName, navigate);
  };

  return (
    <div className="login">
      <h1 className="h1comp">Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              style={{ width: "220px" }}
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: true,
                maxLength: 80,
              })}
            />
            {errors.firstName && <p>This filed is required</p>}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              style={{ width: "220px" }}
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
                maxLength: 80,
              })}
            />
            {errors.lastName && <p>This field is required</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            {...register("emailAddress", {
              required: true,
              maxLength: 80,
            })}
          />
        </div>
        {errors.firstName && <p className="error">This filed is required</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
        </div>
        {errors.password && <p>Password must be 8 characters</p>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
