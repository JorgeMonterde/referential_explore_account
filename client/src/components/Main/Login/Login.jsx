import React, {useState} from "react";
import SignInForm from "./SignInForm/SignInForm";
import LogInForm from "./LogInForm/LogInForm";




const Login = () => {


  

  

  return (
    <section className="login">
      <SignInForm />
      <LogInForm />
      <div className="auth-google">
        <a href="/auth/google">Log in with Google</a>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="auth with google" />
      </div>
    </section>
  );
};

export default Login;

