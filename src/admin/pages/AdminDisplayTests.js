import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AdminDisplayTests = () => {
  const Navigate = useNavigate();
  const currentUser = useParams().username;
  const [testData, setTestData] = useState({});

  const loadTestData = async () => {
    const resp = await axios
      .get("http://localhost:9000/getalltest")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      console.log(resp.data);
      setTestData(resp.data);
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

  // preparing data to export

  let dataToExport = [];

  for (let i = 0; i < testData.length; i++) {
    let obj = [
      testData[i].userid,
      testData[i].technologyname,
      testData[i].isattempted,
      testData[i].score,
      testData[i].outofscore,
    ];

    dataToExport.push(obj);
  }

  console.log("EXPORT DATA", dataToExport);

  useEffect(() => {
    checkoutUser();
    loadTestData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="text-center my-4">All Tests</h2>
        <div className="scrollme">
          {/* excel button */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success btn-sm mb-2"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download Test Details"
          />
          <table
            className="table table-bordered table-responsive border-dark"
            id="table-to-xls"
          >
            <thead className="bg-dark border-light text-light">
              <tr>
                <th>User Id</th>
                <th>Technology Id</th>
                <th>Technology</th>
                <th>Attempted</th>
                <th>Score</th>
                <th>Out of Score</th>
              </tr>
            </thead>
            <tbody className="bg-light">
              {Object.values(testData).map((data) => (
                <tr key={data.id}>
                  <td>{data.userid}</td>
                  <td>{data.technologyid}</td>
                  <td>{data.technologyname}</td>
                  <td>{data.isattempted ? "true" : "false"}</td>
                  <td>{data.score}</td>
                  <td>{data.outofscore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDisplayTests;
