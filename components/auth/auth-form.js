import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function AuthForm({ isLogin, setIsLogin }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [notification, setNotification] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const submitLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
    setNotification("");
  };
  const submitHandler = async (e) => {
    setNotification("loading");
    e.preventDefault();
    const userEmail = emailInputRef.current.value.trim();
    const userPassowrd = passwordInputRef.current.value.trim();
    if (isLogin) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: userEmail,
          password: userPassowrd,
        });
        if (!result.error) {
          setNotification("success");
          setMessage(result.message);
          router.replace("/");
        }
        throw new Error(result.error);
      } catch (error) {
        setNotification("error");
        setMessage(error.message);
      }
    } else {
      try {
        setNotification("loading");
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            password: userPassowrd,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setNotification("success");
        setMessage(data.message);
      } catch (error) {
        setNotification("error");
        setMessage(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={submitLoginHandler}
          >
            {isLogin ? "Create a new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {notification === "loading" && (
        <p className={classes.loading}>Loading...</p>
      )}
      {notification === "error" && <p className={classes.error}>{message}</p>}
      {notification === "success" && (
        <p className={classes.success}>{message}</p>
      )}
    </section>
  );
}

export default AuthForm;
