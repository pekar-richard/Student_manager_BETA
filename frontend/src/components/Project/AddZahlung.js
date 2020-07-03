import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createZahlung } from "../../actions/ZahlungActions";
import { getZahlung } from "../../actions/ZahlungActions";
import { getStudent } from "../../actions/StudentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateLocal } from "../../tools";

class AddZahlung extends Component {
  constructor() {
    super();

    this.state = {
      //Student Daten
      studentAbrechnung: 0,
      //Zahlung daten
      rechnungnichtfillout: false,
      rechnungnichtfilloutmessage: "Bitte tragen Sie die Rechnungsnummer ein!",
      zahlungDatum: formatDateLocal(new Date()),
      zahlungBetrag: "",
      zahlungKonto: "",
      zahlungSteuer: "",
      zahlungRgnr: "",
      zahlungKomm: "",
      zahlungAbrechnung: "",
      createdAt: "",
      updatedAt: "",
      studentIndex: "",
      agenturIndex: "",
      lektionIndex: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newZahlung = {
      zahlungDatum: new Date(this.state.zahlungDatum).toISOString(),
      zahlungBetrag: this.state.zahlungBetrag,
      zahlungKonto: this.state.zahlungKonto,
      zahlungSteuer: this.state.zahlungSteuer,
      zahlungRgnr: this.state.zahlungRgnr,
      zahlungKomm: this.state.zahlungKomm,
      zahlungAbrechnung: this.state.zahlungAbrechnung,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      studentIndex: this.state.studentIndex,
      lektionIndex: this.state.lektionIndex,
      agenturIndex: this.state.agenturIndex,
    };

    this.props.createZahlung(
      newZahlung,
      this.state.studentIndex,
      this.props.history
    );
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      //Student daten
      studentAbrechnung,
      agenturIndex,
    } = nextProps.student.student;

    this.setState({
      //Student daten
      agenturIndex,
      studentAbrechnung,
      zahlungAbrechnung: studentAbrechnung,
    });
  }

  componentDidMount() {
    const { studentIndex } = this.props.match.params;
    this.props.getStudent(studentIndex, this.props.history);

    this.setState({
      studentIndex,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { student } = this.props.student;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="display-4 text-center">
                  Zahlung für {student.studentSortierung} anlegen
                </h3>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Zahlungsdatum</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="zahlungDatum"
                      value={this.state.zahlungDatum}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungBetrag,
                      })}
                      placeholder="Betrag"
                      name="zahlungBetrag"
                      value={this.state.zahlungBetrag}
                      onChange={this.onChange}
                    />
                    {errors.zahlungBetrag && (
                      <div className="invalid-feedback">
                        {errors.zahlungBetrag}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungKonto,
                      })}
                      placeholder="Konto"
                      name="zahlungKonto"
                      value={this.state.zahlungKonto}
                      onChange={this.onChange}
                    />
                    {errors.zahlungKonto && (
                      <div className="invalid-feedback">
                        {errors.zahlungKonto}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="zahlungSteuer"
                      value={this.state.zahlungSteuer}
                      onChange={this.onChange}
                    >
                      <option value={0}>steuerrelevant</option>
                      <option value={1}>nein</option>
                      <option value={2}>ja</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungRgnr,
                      })}
                      placeholder="Rechnungs-Nr."
                      name="zahlungRgnr"
                      value={this.state.zahlungRgnr}
                      onChange={this.onChange}
                    />
                    {errors.zahlungRgnr && (
                      <div className="invalid-feedback">
                        {errors.zahlungRgnr}
                      </div>
                    )}

                    {this.state.rechnungnichtfillout && (
                      <div className="">
                        {this.state.rechnungnichtfilloutmessage}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungKomm,
                      })}
                      placeholder="Kommentar"
                      name="zahlungKomm"
                      value={this.state.zahlungKomm}
                      onChange={this.onChange}
                    />
                    {errors.zahlungKomm && (
                      <div className="invalid-feedback">
                        {errors.zahlungKomm}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="zahlungAbrechnung"
                      value={this.state.zahlungAbrechnung}
                      onChange={this.onChange}
                    >
                      <option value={0}>Abrechnung</option>
                      <option value={1}>Bar</option>
                      <option value={2}>Kredit</option>
                      <option value={3}>Rechnung</option>
                    </select>
                  </div>

                  <input
                    value="Speichern"
                    type="submit"
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

AddZahlung.propTypes = {
  createZahlung: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
  getZahlung: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  zahlung: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  student: state.student,
  zahlung: state.zahlung,
});

export default connect(mapStateToProps, {
  createZahlung,
  getStudent,
  getZahlung,
})(AddZahlung);
