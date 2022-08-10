import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TestSection from "../components/TestSection";

const TestPortal = () => {
  const { state } = useLocation();
  const testData = state.testData;
  const currentTechnology = useParams().technology;
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const checkoutTest = async () => {
    let resp = await axios
      .get(`http://localhost:9000/checkoutuser/?username=${currentUser}`)
      .catch((error) => {
        console.log(error);
        Navigate(`/testportal/${currentUser}/${currentTechnology}`);
        return;
      });

    if (resp) {
      console.log(resp);
      console.log("Test cookie is present");
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
    checkoutTest();
  }, []);

  return (
    <div>
      <TestSection testData={testData} />
    </div>
  );
};

export default TestPortal;
