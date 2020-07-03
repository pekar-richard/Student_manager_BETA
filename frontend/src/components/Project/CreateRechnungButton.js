import React from "react";
import { Link } from "react-router-dom";

const CreateRechnungButton = ({ student_index }) => {
  return (
    <React.Fragment>
      <Link to="/addRechnung/" className="btn btn-lg btn-info">
        Neue Rechnung
      </Link>
    </React.Fragment>
  );
};

export default CreateRechnungButton;
