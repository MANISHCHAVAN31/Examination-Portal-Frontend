import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const RestoreStudent = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;
  const [deletedUserData, setDeletedUserData] = useState({});

  const loadDeletedUserData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getDeletedUsers")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp);
      setDeletedUserData(resp.data);
      return;
    }
  };

  const restoreStudent = async (username) => {
    let resp = await axios
      .post("http://localhost:9000/restoreuser", {
        username: username,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      toast.success(resp.data.message, { autoClose: 1000 });
      Navigate(`/displaystudent/${currentUser}`);
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
    loadDeletedUserData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container text-center">
        <div>
          <h2 className="my-5">Restore Deleted Students</h2>
        </div>
        <table className="table table-bordered border-dark">
          <thead className="bg-secondary text-light">
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Restore</th>
            </tr>
          </thead>

          <tbody className="bg-light">
            {Object.values(deletedUserData).map((data) => (
              <tr key={data.id}>
                <td>{data.credential.username}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    // onClick={() => restoreStudent(data.credential.username)}
                    data-bs-toggle="modal"
                    data-bs-target="#restoremodal"
                  >
                    Restore
                  </button>

                  {/* modal starts here */}
                  <div
                    className="modal fade"
                    id="restoremodal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Do you really want to restore deleted student ?
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
                                .post("http://localhost:9000/restoreuser", {
                                  username: data.credential.username,
                                })
                                .catch((error) => {
                                  console.log(error);
                                  return;
                                });

                              if (resp) {
                                console.log(resp);
                                toast.success(resp.data.message, {
                                  autoClose: 1000,
                                });
                                Navigate(`/displaystudent/${currentUser}`);
                              }
                            }}
                          >
                            Restore Student
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* modal ends here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestoreStudent;
