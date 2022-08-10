import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreateStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [database, setDatabase] = useState("");

  const [technologyData, setTechnologyData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      country === "" ||
      role === "" ||
      frontend === "" ||
      backend === "" ||
      database === ""
    ) {
      toast.error("All fields are required", { autoClose: 1500 });
      return;
    }

    // submitting data
    const resp = await axios
      .post("http://localhost:9000/createuser", {
        firstName,
        lastName,
        country,
        role,
        username,
        password,
        frontend,
        backend,
        database,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success(`Account for ${resp.data[0].firstname} is created`, {
        autoClose: 1000,
      });
      return;
    }
  };

  const loadTechnologies = async () => {
    const resp = await axios
      .get("http://localhost:9000/getalltechnology")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      // console.log(resp);
      setTechnologyData(resp.data);
      return;
    }
  };

  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const checkoutUser = async () => {
    let resp = await axios
      .get(`http://localhost:9000/checkoutuser/?username=${currentUser}`)
      .catch((error) => {
        console.log(error);
        Navigate("/");
        return;
      });

    if (resp) {
      console.log(resp);
      console.log("User is checked out");
      return;
    }
  };

  useEffect(() => {
    checkoutUser();
    loadTechnologies();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-center mt-5">
        <div className="container col-8 shadow text-center bg-white py-3">
          <h2>Create New Student</h2>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg m-1"
                  placeholder="First name"
                  aria-label="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control  form-control-lg m-1"
                  placeholder="Last name"
                  aria-label="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                className="form-control form-control-lg m-1"
                placeholder="Username"
                aria-label="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg m-1"
                  placeholder="Country"
                  aria-label="Country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
              <div className="col">
                <select
                  id="inputState"
                  className="form-select form-select-lg m-1"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Role
                  </option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div>
              <input
                type="text"
                className="form-control form-control-lg m-1"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="col">
                <select
                  id="frontend"
                  className="form-select form-select-lg m-1"
                  value={frontend}
                  onChange={(e) => {
                    setFrontend(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Frontend
                  </option>
                  {Object.values(technologyData).map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  id="frontend"
                  className="form-select form-select-lg m-1"
                  value={backend}
                  onChange={(e) => {
                    setBackend(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Backend
                  </option>
                  {Object.values(technologyData).map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  id="frontend"
                  className="form-select form-select-lg m-1"
                  value={database}
                  onChange={(e) => {
                    setDatabase(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Database
                  </option>
                  {Object.values(technologyData).map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-2 ms-1 d-grid">
              <button className="btn btn-success btn-lg">create student</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
