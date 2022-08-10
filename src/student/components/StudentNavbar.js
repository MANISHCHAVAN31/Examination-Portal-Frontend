import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentNavbar = () => {
  const currentUser = useParams().username;
  const Navigate = useNavigate();

  const handleLogout = async () => {
    let resp = await axios
      .get("http://localhost:9000/logout")
      .catch((error) => {
        console.log(error);
        return;
      });

    if (resp) {
      Navigate(`/`);
      return;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow p-3 mb-2">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to={`/studentdashboard/${currentUser}`}
          >
            <span className="heading fw-bold h2">
              Examination Portal <span className="lead">student</span>
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tests
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item my-1"
                      to={`/displaytest/${currentUser}`}
                    >
                      Display Tests
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              className="btn btn-warning px-4 text-dark"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default StudentNavbar;
