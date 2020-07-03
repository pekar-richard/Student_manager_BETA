import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getZahlungsByStudentIDAndAgentur } from "../actions/ZahlungActions";
import CreateZahlungButton from "./Project/CreateZahlungButton";
import ZahlungBackButton from "./Project/ZahlungBackButton";
import ZahlungItem from "./Project/ZahlungItem";

class ZahlungDashboard extends Component {
  constructor() {
    super();
    this.state = {
      agenturIndex: 0,
      studentIndex: "",
      zahlungsByStudentIDAndAgentur: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      this.setState({ errors: props.errors });
    }

    if (
      props.zahlung.zahlungsByStudentIDAndAgentur !==
      state.zahlungsByStudentIDAndAgentur
    ) {
      return {
        zahlungsByStudentIDAndAgentur:
          props.zahlung.zahlungsByStudentIDAndAgentur,
      };
    }

    return null;
  }

  componentDidMount() {
    const { studentIndex } = this.props.match.params;
    const { agenturIndex } = this.props.student.student;
    this.props.getZahlungsByStudentIDAndAgentur(
      studentIndex,
      agenturIndex,
      this.props.history
    );

    this.setState({
      studentIndex: studentIndex,
      agenturIndex: agenturIndex,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "agenturIndex") {
      this.props.getZahlungsByStudentIDAndAgentur(
        this.state.studentIndex,
        e.target.value,
        this.props.history
      );

      this.setState({
        agenturIndex: e.target.value,
      });
    }
  }

  render() {
    const { student } = this.props.student;
    const { agenturs } = this.props.agentur;

    let kredit = 0;
    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="display-4 text-center">
                Alle Zahlungen {student.studentSortierung}
              </h1>
              <br />
              <br />

              <div className="form-group ">
                <div className="row">
                  {Number(student.agenturIndex) ===
                    Number(this.state.agenturIndex) && (
                    <div className="CreateZahlungButton">
                      <CreateZahlungButton
                        student_index={this.props.match.params.studentIndex}
                      />
                    </div>
                  )}
                  <div className="ZahlungBackButton">
                    <ZahlungBackButton
                      student_index={this.props.match.params.studentIndex}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="form-group "></div>
              <select
                className="form-control form-control-lg zahlungagentur-select"
                name="agenturIndex"
                value={this.state.agenturIndex}
                onChange={this.onChange}
              >
                <option value="0">Agentur</option>
                {agenturs.map((agentur) => (
                  <option
                    key={agentur.agenturIndex}
                    value={agentur.agenturIndex}
                  >
                    {agentur.agenturKurzname}
                  </option>
                ))}
              </select>
              <div />
              {this.state.zahlungsByStudentIDAndAgentur.map(
                (zahlung) => (
                  (kredit = kredit + zahlung.zahlungBetrag),
                  (
                    <ZahlungItem
                      student_index={this.props.match.params.studentIndex}
                      studentKreditSum={kredit}
                      key={zahlung.zahlungIndex}
                      zahlung={zahlung}
                      increment={i++}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ZahlungDashboard.propTypes = {
  getZahlungsByStudentIDAndAgentur: PropTypes.func.isRequired,
  zahlung: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  agentur: PropTypes.object.isRequired,
  lektion: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  zahlung: state.zahlung,
  student: state.student,
  agentur: state.agentur,
  lektion: state.lektion,
});

export default connect(mapStateToProps, {
  getZahlungsByStudentIDAndAgentur,
})(ZahlungDashboard);
