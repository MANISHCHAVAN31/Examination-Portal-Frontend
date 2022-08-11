import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DisplayStudent = () => {
  const [studentUserData, setStudentUserData] = useState({});
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const [pageNo, setPageNo] = useState(1);
  const [noOfStudents, setNoOfStudents] = useState(2);

  const loadStudentUserData = async () => {
    let resp = await axios
      .get(
        `http://localhost:9000/getallstudentuser?pageno=${pageNo}&&noofstudents=${noOfStudents}`
      )
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
  }, [pageNo, noOfStudents]);

  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div>
          <h2 className="my-5">All Students</h2>
        </div>

        <div>
          <div className="row">
            <div className="col">
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  No of Users: {noOfStudents === 100 ? "ALL" : noOfStudents}{" "}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setNoOfStudents(2);
                      }}
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setNoOfStudents(4);
                      }}
                    >
                      4
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setNoOfStudents(6);
                      }}
                    >
                      6
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setNoOfStudents(100);
                      }}
                    >
                      All
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              {/* pagingation */}
              <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="true"
                      onClick={() => {
                        setPageNo(pageNo - 1);
                      }}
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPageNo(1);
                      }}
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPageNo(2);
                      }}
                    >
                      2
                    </a>
                  </li>
                  {/* <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPageNo(3);
                      }}
                    >
                      3
                    </a>
                  </li> */}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => {
                        setPageNo(pageNo + 1);
                      }}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
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
