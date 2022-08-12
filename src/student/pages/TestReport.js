import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TestReport = () => {
  const currentUser = useParams().username;
  const technology = useParams().technology;
  const Navigate = useNavigate();

  const [testDetail, setTestDetail] = useState({});
  const [questions, setQuestions] = useState({});

  const loadTestDetail = async () => {
    let resp = await axios
      .post("http://localhost:9000/gettestofuser", {
        username: currentUser,
        technology,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setTestDetail(resp.data);
      setQuestions(resp.data.questions);
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
    loadTestDetail();
  }, []);

  return (
    <div>
      <div className="container bg-white mt-3">
        <h1 className="display-6 fw-bold py-3 text-center">Report of a Test</h1>
        <div>
          <p>Technology Name : {testDetail.technologyname}</p>
          <p>Is test taken : {testDetail.isattempted ? "true" : "false"}</p>
          <p>Total Score : {testDetail.outofscore}</p>
          <p>Your Score: {testDetail.score}</p>
        </div>
        <div>
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th>Detail</th>
                <th>Options</th>
                <th>Attempted</th>
                <th>Selected Option</th>
                <th>Correct Option</th>
                <th>Score</th>
                <th>Out of Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(questions).map((data) => (
                <tr key={data.id}>
                  <td>{data.detail}</td>
                  <td>{data.options}</td>
                  <td>{data.isattempted ? "true" : "false"}</td>
                  <td>{data.selectedoption}</td>
                  <td>{data.correctoption}</td>
                  <td>{data.score}</td>
                  <td>{data.outofscore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                Navigate(`/studentdashboard/${currentUser}`);
              }}
            >
              Go Back to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReport;
