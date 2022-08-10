import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TestSection = ({ testData }) => {
  const currentUser = useParams().username;
  const currentTechnology = useParams().technology;
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await axios
      .post("http://localhost:9000/submittest", { test: testData })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp);
      toast.success("Test submitted successfully", { autoClose: 1000 });
      Navigate(`/testreport/${currentUser}/${currentTechnology}`);
      return;
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        {Object.values(testData.questions).map((data) => (
          <div
            className="container bg-white m-3 shadow rounded p-4"
            key={data.id}
          >
            <div>
              <h5>Q: {data.detail}</h5>
              <div>
                <div>
                  <input
                    className="form-check-input me-3 mb-2"
                    type="radio"
                    name={data.id}
                    id="option1"
                    onChange={(e) => {
                      data.isattempted = true;
                      data.selectedoption = data.options[0];
                    }}
                  />
                  <label htmlFor="option1">{data.options[0]}</label>
                </div>
                <div className="">
                  <input
                    className="form-check-input me-3 mb-2"
                    type="radio"
                    name={data.id}
                    id="option2"
                    onChange={(e) => {
                      console.log(e);
                      data.isattempted = true;
                      data.selectedoption = data.options[1];
                    }}
                  />
                  <label htmlFor="option2">{data.options[1]}</label>
                </div>
                <div className="">
                  <input
                    className="form-check-input me-3 mb-2"
                    type="radio"
                    name={data.id}
                    id="option3"
                    onChange={(e) => {
                      data.isattempted = true;
                      data.selectedoption = data.options[2];
                    }}
                  />
                  <label htmlFor="option3">{data.options[2]}</label>
                </div>
                <div className="">
                  <input
                    className="form-check-input me-3 mb-2"
                    type="radio"
                    name={data.id}
                    id="option4"
                    onChange={(e) => {
                      console.log(e);
                      data.isattempted = true;
                      data.selectedoption = data.options[3];
                    }}
                  />
                  <label htmlFor="option4">{data.options[3]}</label>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="footer bg-white container-fluid py-2 d-flex justify-content-end">
          <button type="submit" className="btn btn-success col-4 me-5">
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestSection;
