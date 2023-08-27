import React from "react";
import Form from "../components/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function SignUP() {
    const Navigate = useNavigate()
  const handleSubmit = (data) => {
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:5000/signuP",
      data,
    })
      .then((res) => {
        toast.success('successfully added');
        Navigate('/')
      })
      .catch((err) =>{
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);});
  };
  let SignContent = (
    <p>
      Already have an account?{" "}
      <Link className="text-blue-500 underline" to={"/"}>
        Sign In
      </Link>
    </p>
  );
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Form Header="SignUp" onSubmit={handleSubmit} Sign={SignContent} />
    </div>
  );
}

export default SignUP;
