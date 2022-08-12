import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";

const DisplayTest = () => {
  const currentUser = useParams().username;
  const [testData, setTestData] = useState({});
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const Navigate = useNavigate();

  const loadTestData = async () => {
    const resp = await axios
      .post("http://localhost:9000/getusertests", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setTestData(resp.data);

      // countof score
      let score = 0;
      for (let i in resp.data) {
        score += resp.data[i].score;
      }
      setScore(score);

      let outOfScore = 0;
      for (let i in resp.data) {
        outOfScore += resp.data[i].outofscore;
      }
      setTotalScore(outOfScore);

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
    loadTestData();
  }, []);

  return (
    <div>
      <StudentNavbar />
      <div className="container">
        <h2 className="text-center my-4">Your Submitted Tests</h2>
        <table className="table table-bordered border-dark text-center">
          <thead>
            <tr className="bg-dark text-white border-light">
              <th>Technology</th>
              <th>Atttempted</th>
              <th>Score</th>
              <th>Out of Score</th>
              <th>Know More</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(testData).map((data) => (
              <tr key={data.id}>
                <td>{data.technologyname}</td>
                <td>{data.isattempted ? "true" : "false"}</td>
                <td>{data.score}</td>
                <td>{data.outofscore}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      Navigate(
                        `/studenttestdetail/${currentUser}/${data.technologyname}`
                      );
                    }}
                  >
                    more
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-secondary text-white fw-bold">
              <td className="">TOTAL SCORE</td>
              <td></td>
              <td>{score}</td>
              <td>{totalScore}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTest;
