import React from "react";
import { Link } from "react-router-dom";

const CreateStudentButton = () => {
  return (
    <React.Fragment>
      <Link to="/addStudent" className="btn btn-lg btn-info">
        Student anlegen
      </Link>
    </React.Fragment>
  );
};

export default CreateStudentButton;
