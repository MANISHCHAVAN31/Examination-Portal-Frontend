import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const DisplayQuestion = () => {
  const [questionData, setQuestionData] = useState({});
  const Navigate = useNavigate();
  const currentUser = useParams().username;

  const [pageNo, setPageNo] = useState(1);
  const [noOfQuestions, setNoOfQuestions] = useState(2);

  const loadQuestionData = async () => {
    const resp = await axios
      .get(
        `http://localhost:9000/getallquestions?pageno=${pageNo}&&noofquestions=${noOfQuestions}`
      )
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setQuestionData(resp.data);
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
    loadQuestionData();
  }, [noOfQuestions, pageNo]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid text-center">
        <h2 className="pt-4 pb-1">All Questions</h2>

        {/* dropdown */}
        <div className="row">
          <div className="col mx-auto">
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                No of Users: {noOfQuestions === 100 ? "ALL" : noOfQuestions}{" "}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setNoOfQuestions(2);
                    }}
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setNoOfQuestions(4);
                    }}
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setNoOfQuestions(6);
                    }}
                  >
                    6
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setNoOfQuestions(100);
                    }}
                  >
                    All
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col mx-auto">
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
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => {
                      setPageNo(3);
                    }}
                  >
                    3
                  </a>
                </li>
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

        <div className="scrollme">
          {/* excel button */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success btn-sm mb-2"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download Questions"
          />

          <table
            className="table table-bordered table-responsive border-dark"
            id="table-to-xls"
          >
            <thead>
              <tr className="bg-dark border-light text-white">
                <th>Detail</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Option</th>
                <th>Out of Score</th>
                <th>Complexity</th>
                <th>Explore</th>
              </tr>
            </thead>
            <tbody className="bg-light">
              {Object.values(questionData).map((data) => (
                <tr key={data.id}>
                  <td>{data.detail}</td>
                  <td>{data.options[0]}</td>
                  <td>{data.options[1]}</td>
                  <td>{data.options[2]}</td>
                  <td>{data.options[3]}</td>
                  <td>{data.correctoption}</td>
                  <td>{data.outofscore}</td>
                  <td>{data.complexity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        Navigate(`/questiondetail/${currentUser}/${data.id}`);
                      }}
                    >
                      Explore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuestion;
