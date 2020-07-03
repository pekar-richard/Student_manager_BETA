import React from "react";
import { Link } from "react-router-dom";

const AgenturBoardButton = () => {
  return (
    <React.Fragment>
      <Link to="/AgenturDashboard" className="btn btn-lg btn-info">
        Agenturen
      </Link>
    </React.Fragment>
  );
};

export default AgenturBoardButton;
