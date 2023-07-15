import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from "axios";



const LogInForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register: registerLogIn,
    formState: { errors: errorsLogIn },
    handleSubmit: handleSubmitLogIn,
  } = useForm();


  const onSubmitLogIn = async(data) => {
    const {email, password} = data;
    console.log("data???", data)
    //log in 
    const authResponse = await axios.post("auth/email/login", {email, password});
    console.log("auth response: ",authResponse)

    if(authResponse.data.success){
      //Redirect
      navigate("/account/projects");
    } else {
      setMessage(authResponse.data.message);
    }
  };

  console.log("Error here: ", errorsLogIn);




  return (
    <form onSubmit={handleSubmitLogIn(onSubmitLogIn)}>
      <h2>Log in</h2>
      <input type="text" placeholder="Email" {...registerLogIn("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="text" placeholder="Password" {...registerLogIn("password", {required: true, maxLength: 100})} />

      <input type="submit" value="Submit"/>
    </form>
  );
};

export default LogInForm;
