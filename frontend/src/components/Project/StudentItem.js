import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteStudent } from "../../actions/StudentActions";
import { Example } from "./Example";
import "../../App.css";
import { getAgenturs } from "../../actions/AgenturActions";

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agenturs: [],
      agenturKurzname: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { agenturs } = props.agentur;

    return {
      agenturs,
    };
  }

  componentDidMount() {
    this.props.getAgenturs();
  }

  onDeleteClick = (id) => {
    this.props.deleteStudent(id);
  };

  abrechnungValue(abrechnungnummer) {
    if (abrechnungnummer === 1 || abrechnungnummer === "1") {
      return "Bar";
    } else if (abrechnungnummer === 2 || abrechnungnummer === "2") {
      return "Kredit";
    } else if (abrechnungnummer === 3 || abrechnungnummer === "3") {
      return "Rehnung";
    } else {
      return "keine Daten ";
    }
  }

  render() {
    const { student } = this.props;
    const { increment } = this.props;

    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            student.studentAktiv === 1 || student.studentAktiv === 0
              ? "student-aktiv"
              : "student-nichtaktiv"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{/*increment*/}</span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-4 ">
              <h4>
                {" "}
                {student.studentNachname} {student.studentVorname}
              </h4>
              <p>
                Kontostand: {student.studentKredit} Euro <br /> Agentur:{" "}
                {this.state.agenturs.map(
                  (agentur) =>
                    student.agenturIndex === agentur.agenturIndex &&
                    agentur.agenturKurzname
                )}
                <br />
                Abrechnung: {this.abrechnungValue(student.studentAbrechnung)}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-lg-block">
              <ul className="list-group pokus">
                <Link
                  className="linkButton "
                  to={`/LektionDashboard/${student.studentIndex}`}
                >
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Lektionen </i>
                  </li>
                </Link>
                <Link
                  className="linkButton"
                  to={`/updateStudent/${student.studentIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">Ändern</i>
                  </li>
                </Link>
                <Example
                  deleteitem={this.onDeleteClick.bind(
                    this,
                    student.studentIndex
                  )}
                  modalheading={`Löschen Student: ${student.studentSortierung}`}
                  message={
                    "Sind Sie sicher? Dadurch werden der Student und alle damit verbundenen Daten gelöscht!"
                  }
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentItem.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
  getAgenturs: PropTypes.func.isRequired,
  agentur: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
});

export default connect(mapStateToProps, { deleteStudent, getAgenturs })(
  StudentItem
);
