import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DisplayStudent = () => {
  const [studentUserData, setStudentUserData] = useState({});
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const loadStudentUserData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getallstudentuser")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      setStudentUserData(resp.data);
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
    loadStudentUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div>
          <h2 className="my-5">All Students</h2>
        </div>
        <table className="table table-bordered border-dark">
          <thead className="bg-secondary text-light">
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Explore</th>
            </tr>
          </thead>

          <tbody className="bg-light">
            {Object.values(studentUserData).map((data) => (
              <tr key={data.id}>
                <td>{data.credential.username}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      Navigate(
                        `/explorestudent/${currentUser}/${data.credential.username}`,
                        { state: data }
                      );
                    }}
                  >
                    explore
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

export default DisplayStudent;
