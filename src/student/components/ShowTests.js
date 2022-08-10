import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowTests = () => {
  const [stackData, setStackData] = useState({});
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const loadStackData = async () => {
    let resp = await axios
      .post("http://localhost:9000/getstackofuser", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      setStackData(resp.data);
      return;
    }
  };

  useEffect(() => {
    loadStackData();
  }, []);

  return (
    <div>
      <div className="container bg-white shadow rounded mt-5">
        <h3 className="text-center pt-4">Tests available for you</h3>
        <div className="row pt-2 pb-4">
          <div className="col">
            <div className="card bg-light shadow border-info">
              <div className="card-title pt-3 h4 text-center fw-bold">
                {stackData.frontend}
              </div>
              <div className="card-body d-flex justify-content-end">
                <button
                  className="btn btn-info"
                  onClick={() => {
                    Navigate(
                      `/testdashboard/${currentUser}/${stackData.frontend}`
                    );
                  }}
                >
                  Give Test
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-info shadow">
              <div className="card-title pt-3 h4 text-center fw-bold">
                {stackData.backend}
              </div>
              <div className="card-body d-flex justify-content-end">
                <button
                  className="btn btn-info"
                  onClick={() => {
                    Navigate(
                      `/testdashboard/${currentUser}/${stackData.backend}`
                    );
                  }}
                >
                  Give Test
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-info shadow">
              <div className="card-title pt-3 h4 text-center fw-bold">
                {stackData.database}
              </div>
              <div className="card-body d-flex justify-content-end">
                <button
                  className="btn btn-info"
                  onClick={() => {
                    Navigate(
                      `/testdashboard/${currentUser}/${stackData.database}`
                    );
                  }}
                >
                  Give Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTests;
