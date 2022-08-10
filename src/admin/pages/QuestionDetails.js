import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const QuestionDetails = () => {
  const questionId = useParams().questionid;
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const [questionData, setQuestionData] = useState({});

  const loadQuestionData = async () => {
    const resp = await axios
      .post("http://localhost:9000/getquestion", {
        id: questionId,
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setQuestionData(resp.data);
    }
  };

  const deleteQuestion = async (id) => {
    let resp = await axios
      .delete(`http://localhost:9000/deletequestion?id=${id}`)
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });
    if (resp) {
      console.log(resp.data);
      toast.success("Question deleted successfully", { autoClose: 1000 });
      Navigate(`/displayquestion/${currentUser}`);
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
      <div className="card col-10 mt-4 mx-auto shadow">
        <div className="card-title text-center">
          <h2 className="my-3">Question Details</h2>
        </div>
        <div className="card-body">
          <table className="table table-borderless text-start">
            <tbody>
              <tr>
                <th>Detail</th>
                <td>{questionData.detail}</td>
              </tr>
              <tr>
                <th>Correct Option</th>
                <td>{questionData.correctoption}</td>
              </tr>
              <tr>
                <th>Options</th>
                <td>
                  <ul>
                    {questionData.options
                      ? Object.values(questionData.options).map((data) => (
                          <li key={data}>{data}</li>
                        ))
                      : null}
                  </ul>
                </td>
              </tr>
              <tr>
                <th>Out of Score</th>
                <td>{questionData.outofscore}</td>
              </tr>
              <tr>
                <th>Complexity</th>
                <td>{questionData.complexity}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mx-auto mb-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              Navigate(`/updatequestion/${currentUser}/${questionId}`);
            }}
          >
            Update Question
          </button>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete Question
          </button>

          {/* modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Do you really want to delete question ?
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
                    onClick={() => deleteQuestion(questionData.id)}
                  >
                    Delete Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* modal ends here */}
        </div>
        <p className="lead text-center fw-normal text-danger">
          Do not update question data. Update if necessary only
        </p>
      </div>
    </div>
  );
};

export default QuestionDetails;
