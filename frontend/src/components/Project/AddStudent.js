import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStudent } from "../../actions/StudentActions";
import { getAgenturs } from "../../actions/AgenturActions";
import classnames from "classnames";

class AddStudent extends Component {
  constructor() {
    super();

    this.state = {
      studentNachname: "",
      studentVorname: "",
      studentSortierung: "",
      studentGebdat: "",
      studentErsttermin: "",
      studentLetztermin: "",
      studentPreis45: "",
      studentPreis60: "",
      studentPreis90: "",
      studentPreis120: "",
      studentAbrechnung: "",
      studentKredit: "",
      studentAktiv: "",
      studentQuelle: "",
      studentKomm: "",
      createdAt: "",
      updatedAt: "",
      agenturIndex: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newStudent = {
      studentNachname: this.state.studentNachname,
      studentVorname: this.state.studentVorname,
      studentSortierung: this.state.studentSortierung,
      studentGebdat: this.state.studentGebdat,
      studentErsttermin: this.state.studentErsttermin,
      studentLetztermin: this.state.studentLetztermin,
      studentPreis45: this.state.studentPreis45,
      studentPreis60: this.state.studentPreis60,
      studentPreis90: this.state.studentPreis90,
      studentPreis120: this.state.studentPreis120,
      studentAbrechnung: this.state.studentAbrechnung,
      studentKredit: this.state.studentKredit,
      studentAktiv: this.state.studentAktiv,
      studentQuelle: this.state.studentQuelle,
      studentKomm: this.state.studentKomm,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      agenturIndex: this.state.agenturIndex,
    };
    this.props.createStudent(newStudent, this.props.history);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { agenturIndex } = nextProps.agentur;
    this.setState({ agenturIndex });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getAgenturs(this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { agenturs } = this.props.agentur;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Student anlegen</h5>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentNachname,
                      })}
                      placeholder="Nachname"
                      name="studentNachname"
                      value={this.state.studentNachname}
                      onChange={this.onChange}
                    />
                    {errors.studentNachname && (
                      <div className="invalid-feedback">
                        {errors.studentNachname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentVorname,
                      })}
                      placeholder="Vorname"
                      name="studentVorname"
                      value={this.state.studentVorname}
                      onChange={this.onChange}
                    />
                    {errors.studentVorname && (
                      <div className="invalid-feedback">
                        {errors.studentVorname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentPreis45,
                      })}
                      placeholder="Preis 45 min."
                      name="studentPreis45"
                      value={this.state.studentPreis45}
                      onChange={this.onChange}
                    />
                    {errors.studentPreis45 && (
                      <div className="invalid-feedback">
                        {errors.studentPreis45}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentPreis60,
                      })}
                      placeholder="Preis 60 min."
                      name="studentPreis60"
                      value={this.state.studentPreis60}
                      onChange={this.onChange}
                    />
                    {errors.studentPreis60 && (
                      <div className="invalid-feedback">
                        {errors.studentPreis60}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentPreis90,
                      })}
                      placeholder="Preis 90 min."
                      name="studentPreis90"
                      value={this.state.studentPreis90}
                      onChange={this.onChange}
                    />
                    {errors.studentPreis90 && (
                      <div className="invalid-feedback">
                        {errors.studentPreis90}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentPreis120,
                      })}
                      placeholder="Preis 120 min."
                      name="studentPreis120"
                      value={this.state.studentPreis120}
                      onChange={this.onChange}
                    />
                    {errors.studentPreis120 && (
                      <div className="invalid-feedback">
                        {errors.studentPreis120}
                      </div>
                    )}
                  </div>

                  <h6>Geburtsdatum</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="studentGebdat"
                      value={this.state.studentGebdat}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentQuelle,
                      })}
                      placeholder="Quelle"
                      name="studentQuelle"
                      value={this.state.studentQuelle}
                      onChange={this.onChange}
                    />
                    {errors.studentQuelle && (
                      <div className="invalid-feedback">
                        {errors.studentQuelle}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.studentKomm,
                      })}
                      placeholder="Kommentar"
                      name="studentKomm"
                      value={this.state.studentKomm}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.studentKomm && (
                      <div className="invalid-feedback">
                        {errors.studentKomm}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="studentAbrechnung"
                      value={this.state.studentAbrechnung}
                      onChange={this.onChange}
                    >
                      <option value={0}>Abrechnung</option>
                      <option value={1}>Bar</option>
                      <option value={2}>Kredit</option>
                      <option value={3}>Rehnung</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="studentAktiv"
                      value={this.state.studentAktiv}
                      onChange={this.onChange}
                    >
                      <option value={0}>Status</option>
                      <option value={1}>aktiv</option>
                      <option value={2}>nicht aktiv</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="agenturIndex"
                      value={this.state.agenturIndex}
                      onChange={this.onChange}
                    >
                      <option value="">Agentur</option>
                      {agenturs.map((agentur) => (
                        <option
                          key={agentur.agenturIndex}
                          value={agentur.agenturIndex}
                        >
                          {agentur.agenturKurzname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="submit"
                    value="Speichern"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddStudent.propTypes = {
  getAgenturs: PropTypes.func.isRequired,
  createStudent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
  errors: state.errors,
});

export default connect(mapStateToProps, { getAgenturs, createStudent })(
  AddStudent
);
