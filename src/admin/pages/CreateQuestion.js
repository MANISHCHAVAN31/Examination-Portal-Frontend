import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const CreateQuestion = () => {
  const [technology, setTechnology] = useState("");
  const [detail, setDetail] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [outOfScore, setOutOfScore] = useState("");
  const [complexity, setComplexity] = useState("");

  const [technologyData, setTechnologyData] = useState({});
  const loadTechnlogies = async () => {
    const resp = await axios
      .get("http://localhost:9000/getalltechnology")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      setTechnologyData(resp.data);
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // adding options to array
    let selectedoptions = [];
    selectedoptions.push(option1);
    selectedoptions.push(option2);
    selectedoptions.push(option3);
    selectedoptions.push(option4);
    setOutOfScore(complexity + 1);

    const resp = await axios
      .post("http://localhost:9000/createquestion", {
        technologyId: technology,
        detail,
        options: selectedoptions,
        correctOption,
        complexity,
        outOfScore: parseInt(outOfScore),
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp);
      toast.success("Question Created Successfully", { autoClose: 1000 });
    }
  };

  const currentUser = useParams().username;
  const Navigate = useNavigate();

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

  const [complexityData, setComplexityData] = useState([]);

  const loadComplexityData = async () => {
    let resp = await axios
      .get(`http://localhost:9000/getcomplexity?username=${currentUser}`)
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setComplexityData(resp.data);
      return;
    }
  };

  useEffect(() => {
    checkoutUser();
    loadComplexityData();
    loadTechnlogies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container text-center mt-4 bg-white shadow">
        <div>
          <h2 className="py-3">Create New Question</h2>
        </div>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="pb-2 col-4 mx-auto">
            <label htmlFor="technology" className="form-label">
              Select Technology
            </label>
            <select
              name="technology"
              id=""
              className="form-select"
              value={technology}
              onChange={(e) => {
                setTechnology(e.target.value);
              }}
            >
              <option value="" disabled>
                ...
              </option>
              {Object.values(technologyData).map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-2 col-8 mx-auto">
            <label htmlFor="detail" className="form-label">
              Detail
            </label>
            <input
              type="text"
              className="form-control"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <div className="pb-2 col-8 mx-auto">
            <label htmlFor="options" className="form-label">
              Options
            </label>
            <div className="row">
              <div className="col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="correctOption"
                  id="correctOption"
                  value={correctOption}
                  onChange={(e) => {
                    setCorrectOption(option1);
                  }}
                />
                <input
                  type="text"
                  placeholder="option1"
                  className="form-control"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="correctOption"
                  id="correctOption"
                  value={correctOption}
                  onChange={(e) => {
                    setCorrectOption(option2);
                  }}
                />
                <input
                  type="text"
                  placeholder="option2"
                  className="form-control"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="correctOption"
                  id="correctOption"
                  value={correctOption}
                  onChange={(e) => {
                    setCorrectOption(option3);
                  }}
                />
                <input
                  type="text"
                  placeholder="option3"
                  className="form-control"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="correctOption"
                  id="correctOption"
                  value={correctOption}
                  onChange={(e) => {
                    setCorrectOption(option4);
                  }}
                />
                <input
                  type="text"
                  placeholder="option4"
                  className="form-control"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <div className="pb-2 col-8 mx-auto">
            <label htmlFor="correctOption" className="form-label">
              Correct Option
            </label>
            <input
              type="text"
              className="form-control"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
            />
          </div> */}

          <div className="pb-2 col-8 mx-auto">
            <div className="row">
              {/* <div className="col">
                <label className="form-label" htmlFor="outOfScore">
                  Out Of Score
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={outOfScore}
                  onChange={(e) => setOutOfScore(e.target.value)}
                />
              </div> */}
              <div className="col">
                <label className="form-label" htmlFor="complexity">
                  Complexity
                </label>

                <div className="pb-2 mx-auto">
                  <select
                    name="complexity"
                    id=""
                    className="form-select"
                    value={complexity}
                    onChange={(e) => {
                      setComplexity(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      ...
                    </option>
                    {Object.values(complexityData).map((data) => (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-3 pt-2 col-8 mx-auto d-grid">
            <button className="btn btn-success">create question</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
