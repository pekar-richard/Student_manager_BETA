import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents } from "../actions/StudentActions";
import StudentItem from "./Project/StudentItem";
import CreateStudentButton from "./Project/CreateStudentButton";
import AgenturBoardButton from "./Project/AgenturBoardButton";
import RechnungBoardButton from "./Project/RechnungBoardButton";
import "../App.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    const { students } = this.props.student;
    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h5 className="display-4 text-center">Alle Studenten</h5>
              <br />
              <br />
              <div className="studentButtons">
                <div className="CreateStudentButton">
                  <CreateStudentButton />
                </div>
                <div className="AgenturBoardButton">
                  <AgenturBoardButton />
                </div>
                <div className="RechnungBoardButton">
                  <RechnungBoardButton />
                </div>
              </div>
              <hr />
              {students.map((student) => (
                <StudentItem
                  key={student.studentIndex}
                  student={student}
                  increment={i++}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  student: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, { getStudents })(Dashboard);
