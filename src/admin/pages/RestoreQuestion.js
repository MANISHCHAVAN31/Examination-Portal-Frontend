import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const RestoreQuestion = () => {
  const currentUser = useParams().username;
  const [questionData, setQuestionData] = useState({});
  const Navigate = useNavigate();

  const loadDeletedQuestions = async () => {
    let resp = await axios
      .get("http://localhost:9000/getdeletedquestions")
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

  useEffect(() => {
    loadDeletedQuestions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Restore Deleted Questions</h2>
        <div>
          <table className="table table-bordered border-dark">
            <thead className="bg-dark text-white border-light">
              <tr>
                <th>Detail</th>
                <th>Restore</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(questionData).map((data) => (
                <tr key={data.id}>
                  <td>{data.detail}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={async () => {
                        let resp = await axios
                          .post("http://localhost:9000/restorequestion", {
                            id: data.id,
                          })
                          .catch((error) => {
                            console.log(error);
                            toast.error(
                              "Something went wrong during restoration",
                              { autoClose: 1000 }
                            );
                            return;
                          });

                        if (resp) {
                          console.log(resp.data);
                          toast.success("Question restored successfully", {
                            autoClose: 1000,
                          });
                          Navigate(`/displayquestion/${currentUser}`);
                          return;
                        }
                      }}
                    >
                      restore
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

export default RestoreQuestion;
