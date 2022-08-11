import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const TestDetail = () => {
  const currentUser = useParams().username;
  const currentStudent = useParams().studentusername;
  const technology = useParams().technology;
  const Navigate = useNavigate();

  const [testDetail, setTestDetail] = useState({});
  const [questions, setQuestions] = useState({});

  const loadTestDetail = async () => {
    let resp = await axios
      .post("http://localhost:9000/gettestofuser", {
        username: currentStudent,
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
      <Navbar />
      <div className="container bg-white mt-3">
        <h1 className="display-6 fw-bold py-3 text-center">Report of a Test</h1>
        <div>
          <p>Technology Name : {testDetail.technologyname}</p>
          <p>Is test taken : {testDetail.isattempted ? "true" : "false"}</p>
          <p>Total Score : {testDetail.outofscore}</p>
          <p>Your Score: {testDetail.score}</p>
        </div>
        <div>
          {/* excel button */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success btn-sm mb-2"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download User Tests"
          />
          <table className="table table-bordered border-dark" id="table-to-xls">
            <thead>
              <tr>
                <th>Detail</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
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
                  <td>{data.options[0]}</td>
                  <td>{data.options[1]}</td>
                  <td>{data.options[2]}</td>
                  <td>{data.options[3]}</td>
                  <td>{data.isattempted ? "true" : "false"}</td>
                  <td>{data.selectedoption}</td>
                  <td>{data.correctoption}</td>
                  <td>{data.score}</td>
                  <td>{data.outofscore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
