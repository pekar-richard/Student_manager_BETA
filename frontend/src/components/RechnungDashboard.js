import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRechnungs } from "../actions/RechnungActions";
import RechnungItem from "./Project/RechnungItem";
import CreateRechnungButton from "./Project/CreateRechnungButton";
import "../App.css";

class RechnungDashboard extends Component {
  componentDidMount() {
    this.props.getRechnungs();
  }

  render() {
    const { rechnungs } = this.props.rechnung;

    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="display-4 text-center">Alle Rechnungen</h1>
              <br />
              <div className="CreateRechnungButton">
                <div className="row">
                  <CreateRechnungButton
                    student_index={this.props.match.params.studentIndex}
                  />
                </div>
              </div>
              <hr />
              {rechnungs.map((rechnung) => (
                <RechnungItem
                  key={rechnung.rechnIndex}
                  increment={i++}
                  rechnungIndex={rechnung.rechnIndex}
                  rechnung={rechnung}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RechnungDashboard.propTypes = {
  rechnung: PropTypes.object.isRequired,
  getRechnungs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rechnung: state.rechnung,
});

export default connect(mapStateToProps, { getRechnungs })(RechnungDashboard);
