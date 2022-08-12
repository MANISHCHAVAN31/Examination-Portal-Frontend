import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowTests = () => {
  const currentUser = useParams().username;
  const Navigate = useNavigate();
  const [testData, setTestData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadTestData = async () => {
    let resp = await axios
      .post("http://localhost:9000/gettestsstatus", { username: currentUser })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setTestData(resp.data);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    loadTestData();
  }, [loading]);

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container bg-white shadow rounded mt-5">
          <h3 className="text-center pt-4">Tests available for you</h3>

          <div className="row pt-2 pb-4">
            {/* frontend */}
            <div className="col">
              <div className="card bg-light shadow border-info">
                <div className="card-title pt-3 h4 text-center fw-bold">
                  {testData.stack.frontend}
                </div>
                <div className="card-body">
                  {testData.frontend === null ? (
                    <div className="row">
                      <div className="col">
                        <p className="h4">Score: NA</p>
                      </div>
                      <div className="col  d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testdashboard/${currentUser}/${testData.stack.frontend}`
                            );
                          }}
                        >
                          Give Test
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <p className="h3">Score: {testData.frontend.score}</p>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testreport/${currentUser}/${testData.stack.frontend}`
                            );
                          }}
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* backend */}
            <div className="col">
              <div className="card bg-light shadow border-info">
                <div className="card-title pt-3 h4 text-center fw-bold">
                  {testData.stack.backend}
                </div>
                <div className="card-body">
                  {testData.backend === null ? (
                    <div className="row">
                      <div className="col">
                        <p className="h4">Score: NA</p>
                      </div>
                      <div className="col  d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testdashboard/${currentUser}/${testData.stack.backend}`
                            );
                          }}
                        >
                          Give Test
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <p className="h3">Score: {testData.backend.score}</p>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testreport/${currentUser}/${testData.stack.backend}`
                            );
                          }}
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* database */}
            <div className="col">
              <div className="card bg-light shadow border-info">
                <div className="card-title pt-3 h4 text-center fw-bold">
                  {testData.stack.database}
                </div>
                <div className="card-body">
                  {testData.database === null ? (
                    <div className="row">
                      <div className="col">
                        <p className="h4">Score: NA</p>
                      </div>
                      <div className="col  d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testdashboard/${currentUser}/${testData.stack.database}`
                            );
                          }}
                        >
                          Give Test
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <p className="h3">Score: {testData.database.score}</p>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            Navigate(
                              `/testreport/${currentUser}/${testData.stack.database}`
                            );
                          }}
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ShowTests;
