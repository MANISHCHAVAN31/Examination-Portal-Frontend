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

  const loadQuestionData = async () => {
    const resp = await axios
      .get("http://localhost:9000/getallquestions")
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
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid text-center">
        <h2 className="pt-4 pb-1">All Questions</h2>
        <div className="scrollme">
          {/* pagingation */}

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
