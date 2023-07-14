import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmitSignIn = async(data) => {
    console.log(data)
    const response = await axios.post("api/users/user", {data});
    if(response.data.success){
      navigate("/account/projects");
    } else {
      setMessage(response.data.message);
    }
  };

  const onSubmitLogIn = async(data) => {
    console.log(data)
    const response = await axios.post("api/users/user", {data});
    if(response.data.success){
      navigate("/account/projects");
    } else {
      setMessage(response.data.message);
    }
  };

  console.log(errors);

  return (
    <section className="login">
      <form onSubmit={handleSubmit(onSubmitSignIn)}>
        <h2>Sign in</h2>
        <input type="text" placeholder="User name" {...register("user_name", {required: true, maxLength: 80})} />
        <input type="text" placeholder="First name" {...register("firstname", {required: true, maxLength: 80})} />
        <input type="text" placeholder="Last name" {...register("surname", {required: true, maxLength: 100})} />
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="text" placeholder="Password" {...register("password", {required: true, maxLength: 100})} />

        <input type="submit" value="Submit"/>
        <p>{message}</p>
      </form>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmitLogIn)}>
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="text" placeholder="Password" {...register("password", {required: true, maxLength: 100})} />
      </form>
      <div className="auth-google">
        <a href="/auth/google">Log in with Google</a>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="auth with google" />
      </div>
    </section>
  );
};

export default Login;

