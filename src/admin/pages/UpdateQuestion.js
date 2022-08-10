import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateQuestion = () => {
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const questionId = useParams().questionid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questionId);
    const resp = await axios
      .put("http://localhost:9000/updatequestion", {
        questionId,
        parameter,
        value,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      toast.success(resp.data.message, { autoClose: 1000 });
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
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container bg-white text-center mt-5">
        <h2 className="py-4">Update Question</h2>
        <form className="col-6 mx-auto" onSubmit={handleSubmit}>
          <div className="mx-auto pb-3">
            <span className="fw-bold">QUESTION ID : </span> {questionId}
          </div>
          <div className="mx-auto pb-3">
            <label htmlFor="parameter" className="form-label">
              Select Parameter
            </label>
            <select
              id="value"
              className="form-select"
              value={parameter}
              onChange={(e) => {
                setParameter(e.target.value);
              }}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="detail">Detail</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
              <option value="outofscore">Out of Score</option>
              <option value="complexity">Complexity</option>
              <option value="correctoption">Correct Option</option>
            </select>
          </div>
          <div className="pb-3">
            <label htmlFor="value" className="form-label">
              New Value
            </label>
            <input
              type="text"
              id="value"
              className="form-control"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="d-grid pb-4 pt-1">
            <button type="submit" className="btn btn-primary">
              update question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
