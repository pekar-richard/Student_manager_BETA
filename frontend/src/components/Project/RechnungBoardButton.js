import React from "react";
import { Link } from "react-router-dom";

const RechnungBoardButton = () => {
  return (
    <React.Fragment>
      <Link to="/RechnungDashboard/" className="btn btn-lg btn-info">
        Rechnungen
      </Link>
    </React.Fragment>
  );
};

export default RechnungBoardButton;
