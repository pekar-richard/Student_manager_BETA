import React from "react";
import { Link } from "react-router-dom";

const ZahlungBackButton = ({ student_index }) => {
  return (
    <React.Fragment>
      <Link
        to={`/LektionDashboard/${student_index}`}
        className="btn btn-lg btn-info"
      >
        Zurück
      </Link>
    </React.Fragment>
  );
};

export default ZahlungBackButton;
