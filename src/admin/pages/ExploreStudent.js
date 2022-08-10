import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ExploreStudent = () => {
  const currentUser = useParams().username;
  const currentStudent = useParams().studentusername;
  const Navigate = useNavigate();
  const { state } = useLocation();
  const data = state;
  const [testData, setTestData] = useState({});

  const loadTestData = async () => {
    const resp = await axios
      .post("http://localhost:9000/getusertests", { username: currentStudent })
      .catch((error) => console.log(error));

    if (resp) {
      console.log(resp);
      setTestData(resp.data);
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
      <Navbar />

      <div className="container bg-light shadow mt-4">
        <h3 className="p-4  text-center" id="subheading ">
          Personal Details
        </h3>
        <div className="col-6 mx-auto pb-3">
          <table className="table">
            <tbody className="text-start">
              <tr>
                <th>Username</th>
                <td>{data.credential.username}</td>
              </tr>

              <tr>
                <th>First Name</th>
                <td>{data.firstname}</td>
              </tr>

              <tr>
                <th>Last Name</th>
                <td>{data.lastname}</td>
              </tr>

              <tr>
                <th>Country</th>
                <td>{data.country}</td>
              </tr>

              <tr>
                <th>Role</th>
                <td>{data.role}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center pt-3">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => {
                Navigate(`/updatestudent/${currentUser}/${currentStudent}`);
              }}
            >
              Update Student
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              Delete Student
            </button>

            {/* modal */}
            <div
              className="modal fade"
              id="deleteModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Do you really want to delete student ?
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={async () => {
                        let resp = await axios
                          .delete(
                            `http://localhost:9000/deleteuser?username=${data.credential.username}`
                          )
                          .catch((error) => {
                            console.log(error);
                            return;
                          });

                        if (resp) {
                          console.log(resp);
                          toast.success(resp.data.message, { autoClose: 1000 });
                          Navigate(`/displaystudent/${currentUser}`);
                        }
                      }}
                    >
                      Delete Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table of tests performed by student */}

      <div className="container bg-white mt-5 pb-2 shadow">
        <h3 className="text-center py-4">
          Tests Submitted by {currentStudent}
        </h3>
        <table className="table table-bordered border-dark text-center">
          <thead>
            <tr className="">
              <th>Techology</th>
              <th>Score</th>
              <th>OutOfScore</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(testData).map((data) => (
              <tr key={data.id}>
                <td>{data.technologyname}</td>
                <td>{data.score}</td>
                <td>{data.outofscore}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      Navigate(
                        `/testdetail/${currentUser}/${currentStudent}/${data.technologyname}`
                      );
                    }}
                  >
                    more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExploreStudent;
