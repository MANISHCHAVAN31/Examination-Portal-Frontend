import React from "react";
import "./App.css";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/pages/AdminDashboard";
import CreateStudent from "./admin/pages/CreateStudent";
import DisplayStudent from "./admin/pages/DisplayStudent";
import RestoreStudent from "./admin/pages/RestoreStudent";
import Login from "./Login";
import ExploreStudent from "./admin/pages/ExploreStudent";
import StudentDashboard from "./student/pages/StudentDashboard";
import CreateQuestion from "./admin/pages/CreateQuestion";
import DisplayQuestion from "./admin/pages/DisplayQuestion";
import UpdateQuestion from "./admin/pages/UpdateQuestion";
import TestDashboard from "./student/pages/TestDashboard";
import DisplayTest from "./student/pages/DisplayTest";
import TestPortal from "./student/pages/TestPortal";
import UpdateStudent from "./admin/pages/UpdateStudent";
import TestReport from "./student/pages/TestReport";
import QuestionDetails from "./admin/pages/QuestionDetails";
import TestDetail from "./admin/pages/TestDetail";
import StudentTestDetail from "./student/pages/StudentTestDetail";
import RestoreQuestion from "./admin/pages/RestoreQuestion";
import AdminDisplayTests from "./admin/pages/AdminDisplayTests";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard/:username" element={<AdminDashboard />} />
        <Route path="/createstudent/:username" element={<CreateStudent />} />
        <Route path="/displaystudent/:username" element={<DisplayStudent />} />
        <Route
          path="/updatestudent/:username/:studentusername"
          element={<UpdateStudent />}
        />

        <Route path="/restorestudent/:username" element={<RestoreStudent />} />
        <Route
          path="/explorestudent/:username/:studentusername"
          element={<ExploreStudent />}
        />
        <Route path="/createquestion/:username" element={<CreateQuestion />} />
        <Route
          path="/displayquestion/:username"
          element={<DisplayQuestion />}
        />
        <Route
          path="/updatequestion/:username/:questionid"
          element={<UpdateQuestion />}
        />
        <Route
          path="/questiondetail/:username/:questionid"
          element={<QuestionDetails />}
        />
        <Route
          path="/testdetail/:username/:studentusername/:technology"
          element={<TestDetail />}
        />
        <Route
          path="/restorequestions/:username"
          element={<RestoreQuestion />}
        />
        <Route
          path="/admindisplaytest/:username"
          element={<AdminDisplayTests />}
        />

        {/* student */}
        <Route
          path="/studentdashboard/:username"
          element={<StudentDashboard />}
        />
        <Route
          path="/testdashboard/:username/:technology"
          element={<TestDashboard />}
        />
        <Route path="/displaytest/:username" element={<DisplayTest />} />
        <Route
          path="/testportal/:username/:technology"
          element={<TestPortal />}
        />
        <Route
          path="/testreport/:username/:technology"
          element={<TestReport />}
        />
        <Route
          path="/studenttestdetail/:username/:technology"
          element={<StudentTestDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
