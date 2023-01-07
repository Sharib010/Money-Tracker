import React, { useState } from "react";
import "../css/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [accInfo, setAccInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccInfo({
      ...accInfo,
      [name]: value,
    });
  };

  const signUp_btn = () => {
    if (
      accInfo.name === "" ||
      accInfo.email === "" ||
      !accInfo.password ||
      !accInfo.cpassword ||
      !accInfo.password === accInfo.cpassword
    ) {
      alert("fill all");
    } else {
      axios.post("http://localhost:4000/signup", accInfo).then((res) => {
      
        alert(res.data.message);
        setAccInfo({ name: "", email: "", password: "", cpassword: "" });
        navigate("/login");
      });
    }

   
  };

  return (
    <>
      <div className="container ">
        <div className="login_box">
          <p className="pt-4">Sign-up</p>
          <div className="pb-4">
            <div className="login_form mx-5">
              <label htmlFor="name">Enter your Name</label>
              <input
                className="mb-3"
                type="text"
                name="name"
                onChange={handleChange}
                value={accInfo.name}
              />
              <label htmlFor="email">Enter your E-mail</label>
              <input
                className="mb-3"
                type="text"
                name="email"
                onChange={handleChange}
                value={accInfo.email}
              />
              <label htmlFor="password">Enter password</label>
              <input
                className="mb-3"
                type="text"
                name="password"
                onChange={handleChange}
                value={accInfo.password}
              />
              <label htmlFor="cpassword">Enter confirm password</label>
              <input
                className="mb-1"
                type="text"
                name="cpassword"
                onChange={handleChange}
                value={accInfo.cpassword}
              />
              <div className="d-flex justify-content-between mt-4">
                <button onClick={signUp_btn} className="btn btn-primary">
                  sign-up
                </button>
                <Link to="/Login">already an account &rArr; </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
