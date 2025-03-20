import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "/src/store/hooks";

import { ErrorText, InputText } from "/src/components";
import { observer } from "mobx-react-lite";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  isRemembered: z.boolean().optional(),
});

const Login = observer(() => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      isRemembered: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      await auth.login(data);
      if (auth.token) {
        navigate("/profile");
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return <Navigate to="/profile" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="emailId"
            name="email"
            register={register}
            placeholder="Email"
            updateType="emailId"
            containerStyle="input-wrapper"
            labelTitle="Email"
          />
          <InputText
            type="password"
            name="password"
            register={register}
            placeholder="Password"
            updateType="password"
            containerStyle="input-wrapper"
            labelTitle="Password"
          />
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              {...register("isRemembered")}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errors.email && (
            <ErrorText styleClass="error-text">
              {errors.email.message}
            </ErrorText>
          )}
          {errors.password && (
            <ErrorText styleClass="error-text">
              {errors.password.message}
            </ErrorText>
          )}
          {errorMessage && (
            <ErrorText styleClass="error-text">{errorMessage}</ErrorText>
          )}
          {loading && <p>Loading...</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
});

export default Login;
