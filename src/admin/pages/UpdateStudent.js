import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const UpdateStudent = () => {
  const currentStudent = useParams().studentusername;
  const currentUser = useParams().username;
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await axios
      .put("http://localhost:9000/updateuser", {
        username: currentStudent,
        parameter,
        value,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp.data);
      toast.success(resp.data.message, { autoClose: 1000 });
      // Navigate(`/explorestudent/${currentUser}/${currentStudent}`);
      return;
    }
  };

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
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container bg-light text-center">
        <h2 className="py-3">Update User</h2>
        <form className="col-6 mx-auto" onSubmit={handleSubmit}>
          <div className="">
            <label for="inputState" className="form-label">
              Select Parameter to Update
            </label>
            <select
              id="inputState"
              className="form-select"
              value={parameter}
              onChange={(e) => {
                setParameter(e.target.value);
              }}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="firstname">First Name</option>
              <option value="lastname">Last Name</option>
              <option value="country">Country</option>
              <option value="role">Role</option>
              {/* <option>Frontend</option>
              <option>Backend</option>
              <option>Database</option> */}
            </select>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="value" className="form-label">
              New Value to Update
            </label>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="d-grid pb-4">
            <button className="btn btn-success" type="submit">
              update student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
