import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents } from "../../src/actions/StudentActions";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { HorizontalBar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.props.getStudents();

    this.state = {
      dataHorizontal: {
        labels: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
        datasets: [
          {
            label: "Kontostand",
            data: [22, 33, 55, 12, 86, 23, 14],
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },

      dataBar: {
        labels: [],
        datasets: [
          {
            label: "Kontostand",
            data: [],
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
            ],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    let studentNames = [];
    let studentKontos = [];
    let i = 0;
    props.student.students.map((student) => {
      studentNames[i] = student.studentSortierung;
      studentKontos[i] = student.studentKredit;

      i++;
    });

    return {
      dataHorizontal: {
        labels: studentNames,
        datasets: [
          {
            label: "Kontostand",
            data: studentKontos,
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },

      dataBar: {
        labels: studentNames,
        datasets: [
          {
            label: "Kontostand",
            data: studentKontos,
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)",
            ],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }

  render() {
    const { students } = this.props.student;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <MDBContainer className="chartstudentkontostand">
                <h3 className="mt-5">Studenten Kontostand €</h3>
                <br />
                <Bar
                  data={this.state.dataBar}
                  options={this.state.barChartOptions}
                />
              </MDBContainer>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <MDBContainer className="chartstudentkontostand">
                <h3 className="mt-5">Studenten Kontostand €</h3>
                <HorizontalBar
                  data={this.state.dataHorizontal}
                  options={{ responsive: true }}
                />
              </MDBContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chart.propType = {
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, {
  getStudents,
})(Chart);
