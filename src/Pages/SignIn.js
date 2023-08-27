import React, { useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function SignIn() {
    const Navigate = useNavigate()
    useEffect(()=>{
     const Token = localStorage.getItem('user')
     console.log(Token)
     if(Token)Navigate('/main')
    },[])
    const handleSubmit = (data) => {
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:5000/signin",
      data,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", res?.data);
        toast.success("successfully Loged in");
        Navigate('/main')

      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || err?.message);
      });
  };
  let SignContent = (
    <p>
      Don`t have an account?{" "}
      <Link className="text-blue-500 underline" to={"/signup"}>
        Sign up
      </Link>
    </p>
  );
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Form Header="LogIn" onSubmit={handleSubmit} Sign={SignContent} />
    </div>
  );
}

export default SignIn;
