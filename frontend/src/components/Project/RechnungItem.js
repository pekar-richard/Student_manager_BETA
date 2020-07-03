import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRechnung } from "../../actions/RechnungActions";
import "../../App.css";
import { Example } from "./Example";

class RechnungItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteRechnung(id);
  };

  rechnungtypValue(rechnungtypvalue) {
    if (rechnungtypvalue === 1 || rechnungtypvalue === "1") {
      return "Student";
    } else if (rechnungtypvalue === 2 || rechnungtypvalue === "2") {
      return "Agentur";
    } else {
      return "keine Daten ";
    }
  }

  render() {
    const { increment } = this.props;
    const { rechnung } = this.props;
    return (
      <div className="container">
        <div className="card card-body mb-3 student-aktiv">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{/*increment*/}</span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-4 ">
              <h5>{rechnung.rechnName}</h5>
              <p>
                IČO: {rechnung.rechnIco}
                <br />
                DIČ: {rechnung.rechnDic}
                <br />
                Typ: {this.rechnungtypValue(rechnung.rechnTyp)}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-lg-block">
              <ul className="list-group pokus">
                <Link
                  className="linkButton"
                  to={`/updateRechnung/${rechnung.rechnIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Ändern</i>
                  </li>
                </Link>

                <Example
                  deleteitem={this.onDeleteClick.bind(
                    this,
                    rechnung.rechnIndex
                  )}
                  modalheading={`Delete Rechnung: ${rechnung.rechnName}`}
                  message={
                    "Bist du sicher? Dadurch werden die Rechnung und alle damit verbundenen Daten gelöscht!"
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

RechnungItem.propTypes = {
  deleteRechnung: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteRechnung })(RechnungItem);
