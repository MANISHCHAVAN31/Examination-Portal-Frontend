import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const StudentPieChartComponent = ({ username }) => {
  const [data, setData] = useState({});
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const loadData = async () => {
    const resp = await axios
      .post("http://localhost:9000/getStudentPieChartData", { username })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp);
      let percentage = (resp.data.testcount * 100) / 3;
      setData(percentage);
      return;
    }
  };

  const loadTestData = async () => {
    const resp = await axios
      .post("http://localhost:9000/getusertests", {
        username,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
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

  useEffect(() => {
    loadData();
    loadTestData();
  });

  return (
    <div className="row mt-3 pb-4">
      <div className="col">
        <div
          className=" col-4 mx-auto"
          style={{ height: "30vh", width: "30vh" }}
        >
          <CircularProgressbar value={data} text={`${parseInt(data)}%`} />
          <h4 className="text-center mt-2 lead fw-bold">Tests Completed</h4>
        </div>
      </div>
      <div className="col text-center mt-5">
        <div className="card col-6 shadow">
          <div className="card-body bg-success text-light">
            <h1 className="fw-bold">
              {" "}
              {score} / {totalScore}
            </h1>
            <p className="lead fw-bold text-center">Marks Obtained</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPieChartComponent;
