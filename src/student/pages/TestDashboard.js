import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TestDashboard = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;
  const currentTechnology = useParams().technology;

  const [testData, setTestData] = useState({});

  const handleNewTest = async () => {
    let resp = await axios
      .post("http://localhost:9000/createtest", {
        user: currentUser,
        technology: currentTechnology,
      })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      const data = resp.data;
      navigateToTestPortal(data);
    }
  };

  const navigateToTestPortal = (data) => {
    Navigate(`/testportal/${currentUser}/${currentTechnology}`, {
      state: { testData: data },
    });
  };

  const loadTestData = async () => {
    let resp = await axios
      .post("http://localhost:9000/gettestofuser", {
        username: currentUser,
        technology: currentTechnology,
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    if (resp) {
      console.log(resp.data);
      setTestData(resp.data);
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

  if (testData && testData.technologyname === currentTechnology) {
    return (
      <div>
        <h1>You have given this test already</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container mt-5 bg-white shadow rounded">
          <div className="card border-0">
            <div className="card-header bg-white display-4 text-center my-2">
              Instructions for attempting test
            </div>
            <div className="card-body mt-4">
              <div className="text-center mb-3">
                <h4>Topic of Test: {currentTechnology}</h4>
              </div>
              <ul style={{ listStyleType: "square" }}>
                <li>Select one of 4 options as the final answer.</li>
                <li>Do not exit the test before submitting.</li>
                <li>Submit the test before time</li>
                <li>Every question has a negative marking</li>
              </ul>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button
                className="btn btn-secondary me-3"
                onClick={() => Navigate(`/studentdashboard/${currentUser}`)}
              >
                Go Back
              </button>
              <button
                className="btn btn-success col-3"
                onClick={() => {
                  handleNewTest();
                }}
              >
                Attempt Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TestDashboard;
