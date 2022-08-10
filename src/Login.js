import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    if (username === "" || password === "") {
      toast.error("Incomplete Data", { autoClose: 1000 });
      return;
    }

    let resp = await axios
      .post("http://localhost:9000/login", { username, password })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      if (resp.data.role === "admin") {
        Navigate(`/admindashboard/${username}`);
        return;
      } else if (resp.data.role === "student") {
        Navigate(`/studentdashboard/${username}`);
        return;
      }
    }
  };

  return (
    <div className="text-center">
      <div className="container col-8">
        <div className="row">
          <div className="col vertical-center">
            <div className="container">
              <div className="card border-0 login-card">
                <div className="card-title">
                  <h1 className="display-6 mt-5 mb-3 fw-bold title">
                    EXAMINATION PORTAL
                  </h1>
                  <h5>Login Here to proceed</h5>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Username</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="d-grid mt-4 mb-4">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg mx-auto col-4"
                        >
                          login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
