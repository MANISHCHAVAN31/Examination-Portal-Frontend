import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";
import ShowTests from "../components/ShowTests";

const StudentDashboard = () => {
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
      <StudentNavbar />
      <ShowTests />
    </div>
  );
};

export default StudentDashboard;
