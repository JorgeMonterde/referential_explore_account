import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignInForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register: registerSignIn,
    formState: { errors: errorsSignIn },
    handleSubmit: handleSubmitSignIn,
  } = useForm();




  const onSubmitSignIn = async(data) => {
    console.log(data)
    const response = await axios.post("api/users/user", {data});
    console.log(response)
    if(response.data.success){
      const {email, password} = data;
      const authResponse = await axios.post("auth/email/login", {email, password});
      console.log("auth response", authResponse)
      //Redirect
      navigate("/account/projects");
    } else {
      setMessage(response.data.message);
    }
  };

  console.log("Error from Sign In: ", errorsSignIn);




  return (
    <form className="sign-in-form" onSubmit={handleSubmitSignIn(onSubmitSignIn)}>
      <h2>Sign in</h2>
      <input type="text" placeholder="User name" {...registerSignIn("user_name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="First name" {...registerSignIn("firstname", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...registerSignIn("surname", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...registerSignIn("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="text" placeholder="Password" {...registerSignIn("password", {required: true, maxLength: 100})} />

      <input type="submit" value="Submit"/>
      <p>{message}</p>
    </form>
  );
};

export default SignInForm;
