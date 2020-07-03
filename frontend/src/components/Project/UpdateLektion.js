import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { updateLektion } from "../../actions/LektionActions";
import { getLektion } from "../../actions/LektionActions";
import { getStudent } from "../../actions/StudentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateTimeLocal, formatDateTime2 } from "../../tools";

class UpdateLektion extends Component {
  constructor() {
    super();

    this.state = {
      nichtgenugkredit: false,
      nichtgenugkreditmessage: "Der Student hat nicht genug Guthaben!",
      //Zahlung daten
      zahlungsByStudentID: [],
      //Student daten
      studentKredit: "",
      studentPreis45: "",
      studentPreis60: "",
      studentPreis90: "",
      studentPreis120: "",
      studentSortierung: "",
      //Lektion daten
      lektionIndex: "",
      lektionDatum: "",
      lektionMin: "",
      lektionPreis: "",
      lektionArt: "",
      lektionStatus: "",
      createdAt: "",
      updatedAt: "",
      studentIndex: "",
      agenturIndex: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      //Student daten
      studentKredit,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentSortierung,
    } = nextProps.student.student;

    const {
      //Lektion daten
      lektionIndex,
      lektionDatum = "",
      lektionMin,
      lektionPreis,
      lektionArt,
      lektionStatus,
      createdAt,
      updatedAt,
      studentIndex,
      agenturIndex,
    } = nextProps.lektion.lektion;

    this.setState({
      //Student daten
      studentKredit,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentSortierung,
      //Lektion daten
      lektionDatum: formatDateTimeLocal(lektionDatum),
      lektionIndex,
      lektionMin,
      lektionPreis,
      lektionArt,
      lektionStatus,
      createdAt,
      updatedAt,
      studentIndex,
      agenturIndex,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newLektion = {
      lektionDatum: new Date(this.state.lektionDatum).toISOString(),
      lektionIndex: this.state.lektionIndex,
      lektionMin: this.state.lektionMin,
      lektionPreis: this.state.lektionPreis,
      lektionArt: this.state.lektionArt,
      lektionStatus: this.state.lektionStatus,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      studentIndex: this.state.studentIndex,
      agenturIndex: this.state.agenturIndex,
    };

    this.props.updateLektion(
      newLektion,
      this.state.lektionIndex,
      this.state.studentIndex,
      this.props.history
    );
  }

  componentDidMount() {
    const { lektionIndex, studentIndex } = this.props.match.params;

    this.props.getStudent(studentIndex, this.props.history);
    this.props.getLektion(lektionIndex, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "lektionMin") {
      this.lektionPrice(e.target.value);
    }
  }

  checkKredit() {
    if (this.state.studentKredit >= this.state.lektionPreis) {
      if (this.state.nichtgenugkredit === true) {
        this.setState({
          nichtgenugkredit: false,
        });
      }
    } else {
      if (this.state.nichtgenugkredit === false) {
        this.setState({
          nichtgenugkredit: true,
        });
      }
    }
  }

  componentDidUpdate() {
    this.checkKredit();
  }

  lektionPrice = (lektionMin) => {
    if (lektionMin === "0") {
      this.setState({ lektionPreis: 0 });
    }

    if (lektionMin === "45") {
      this.setState({ lektionPreis: this.state.studentPreis45 });
    }

    if (lektionMin === "60") {
      this.setState({ lektionPreis: this.state.studentPreis60 });
    }

    if (lektionMin === "90") {
      this.setState({ lektionPreis: this.state.studentPreis90 });
    }

    if (lektionMin === "120") {
      this.setState({ lektionPreis: this.state.studentPreis120 });
    }
  };

  render() {
    const { errors } = this.state;
    const { student } = this.props.student;
    const { lektion } = this.props.lektion;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="display-4 text-center">
                  {this.state.studentSortierung} Lektion{" "}
                  {formatDateTime2(this.state.lektionDatum)} aktualisieren
                </h3>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Lektionsdatum</h6>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control form-control-lg"
                      name="lektionDatum"
                      value={this.state.lektionDatum || ""}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionMin"
                      value={this.state.lektionMin}
                      onChange={this.onChange}
                    >
                      <option value={0}>Lektionsdauer</option>
                      <option value={45}>45 min.</option>
                      <option value={60}>60 min.</option>
                      <option value={90}>90 min.</option>
                      <option value={120}>120 min.</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.lektionPreis,
                      })}
                      placeholder="Lektionspreis"
                      name="lektionPreis"
                      value={this.state.lektionPreis || ""}
                      onChange={this.onChange}
                    />
                    {errors.lektionPreis && (
                      <div className="invalid-feedback">
                        {errors.lektionPreis}
                      </div>
                    )}
                    {this.state.nichtgenugkredit && (
                      <div className="">
                        {this.state.nichtgenugkreditmessage}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionArt"
                      value={this.state.lektionArt}
                      onChange={this.onChange}
                    >
                      <option value={0}>Lektionsart</option>
                      <option value={1}>Skype</option>
                      <option value={2}>Real</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionStatus"
                      value={this.state.lektionStatus}
                      onChange={this.onChange}
                    >
                      <option value={0}>Lektionstatus</option>
                      <option value={1}>gehalten</option>
                      <option value={2}>verpasst</option>
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

UpdateLektion.propTypes = {
  updateLektion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getLektion: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  lektion: state.lektion,
  student: state.student,
});

export default connect(mapStateToProps, {
  updateLektion,
  getLektion,
  getStudent,
})(UpdateLektion);
