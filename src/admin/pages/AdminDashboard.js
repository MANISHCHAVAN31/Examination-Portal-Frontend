import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";

const AdminDashboard = () => {
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const [percentage, setPercentage] = useState(0);

  const checkoutUser = async () => {
    let resp = await axios
      .get(`http://localhost:9000/checkoutuser/?username=${currentUser}`)
      .catch((error) => {
        console.log(error);
        Navigate("/");
        return;
      });
    console.log(resp);
    if (resp) {
      console.log(resp);
      console.log("User is checked out");
    }
  };

  const getPieChartData = async () => {
    const resp2 = await axios
      .get("http://localhost:9000/getdataforpiechart")
      .catch((error) => console.log(error));
    console.log(resp2.data);
    if (resp2) {
      console.log(resp2.data);

      console.log(typeof resp2.data.TotalUsers);

      let percentageValue = 0;
      percentageValue =
        (resp2.data.TestGivenUsers * 100) / resp2.data.TotalUsers;
      setPercentage(percentageValue);
      console.log(percentageValue);
    }
  };

  console.log(percentage);
  useEffect(() => {
    checkoutUser();
    getPieChartData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="m-5 container col-4"
        style={{ height: "40vh", width: "40vh" }}
      >
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
        <div>
          <p className="text-center lead fw-bold mt-2">
            Percentage of Users Completed Tests
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
