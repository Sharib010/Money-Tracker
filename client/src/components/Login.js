import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const login_btn = () => {
    if (loginInfo.name === "" || loginInfo.password === "") {
      alert("fill all");
    } else {
      axios
        .post("http://localhost:4000/login", loginInfo, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            setLoginInfo({ email: "", password: "" });
            alert("login successfully");
            document.cookie = `jwtoken=${res.data}`;
            document.location.reload();
            navigate("/");
          }
        });
    }
  };

  return (
    <>
      <nav className="navbar text-light bg-dark">
        <div className="container">
          <div className="mx-auto">
            <h3>Money Tracker</h3>
          </div>
        </div>
      </nav>
      <div className="container my-5">
        <div className="login_box">
          <p className="pt-4">Login</p>
          <div className="pb-4">
            <div className="login_form mx-5">
              <label htmlFor="email">Enter your E-mail</label>
              <input
                className="mb-3"
                type="email"
                name="email"
                onChange={handleChange}
                value={loginInfo.email}
              />
              <label htmlFor="password">Enter password</label>
              <input
                className="mb-3"
                type="text"
                name="password"
                onChange={handleChange}
                value={loginInfo.password}
              />
              <div className="d-flex justify-content-between mt-4">
                <button onClick={login_btn} className="btn btn-primary">
                  Login
                </button>
                <Link to="/Signup">Sign-up &rArr; </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
