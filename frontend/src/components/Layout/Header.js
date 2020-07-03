import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAusloggen } from "../../actions/LoginActions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAusloggen() {
    this.props.getAusloggen(this.props.history);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-info  mb-4">
        <div className="container">
          <a className="navbar-brand" href="/dashboard">
            Studentenverwaltung
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Übersicht
                </a>
              </li>
            </ul>
            <ul className="navbar-nav  diagramms">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Diagramms
                </a>
              </li>
            </ul>
            <button
              className="btn btn-lg btn-warning"
              onClick={this.getAusloggen.bind(this)}
            >
              Abmelden
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  getAusloggen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  logout: state.logout,
});

export default connect(mapStateToProps, {
  getAusloggen,
})(withRouter(Header));
