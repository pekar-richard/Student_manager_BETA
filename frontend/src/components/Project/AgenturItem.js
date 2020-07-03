import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAgentur } from "../../actions/AgenturActions";
import "../../App.css";
import { Example } from "./Example";

class AgenturItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteAgentur(id);
  };
  render() {
    const { increment } = this.props;
    const { agentur } = this.props;

    return (
      <div className="container">
        <div className="card card-body mb-3 student-aktiv">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{/*increment*/}</span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-4 ">
              <h3>{agentur.agenturKurzname}</h3>
              <p>{agentur.agenturKomm}</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-lg-block">
              <ul className="list-group pokus">
                <Link
                  className="linkButton"
                  to={`/updateAgentur/${agentur.agenturIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Ändern</i>
                  </li>
                </Link>
                <Example
                  deleteitem={this.onDeleteClick.bind(
                    this,
                    agentur.agenturIndex
                  )}
                  modalheading={`Löschen Agentur: ${agentur.agenturKurzname}`}
                  message={
                    "Sind Sie sicher? Dadurch werden die Agentur und alle damit verbundenen Daten gelöscht!"
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

AgenturItem.propTypes = {
  deleteAgentur: PropTypes.func.isRequired,
};

export default connect(null, { deleteAgentur })(AgenturItem);
