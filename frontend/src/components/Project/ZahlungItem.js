import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteZahlung } from "../../actions/ZahlungActions";
import { formatDateTime, formatDateTime2 } from "../../tools";
import "../../App.css";
import { Example } from "./Example";

class ZahlungItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteZahlung(id);
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
    const { zahlung } = this.props;
    const { increment } = this.props;
    const { studentKreditSum } = this.props;
    const { student_index } = this.props;
    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            zahlung.zahlungBetrag <= 0 ? "student-nichtaktiv" : "student-aktiv"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{/*increment*/}</span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-4 ">
              <h4>{formatDateTime2(zahlung.zahlungDatum)}</h4>
              <p>
                Betrag: {zahlung.zahlungBetrag} Euro
                <br />
                Kontostand: {studentKreditSum} Euro
                <br />
                {zahlung.zahlungRgnr !== 0 && (
                  <div>
                    Rechnungs-Nr.: {zahlung.zahlungRgnr}
                    <br />
                  </div>
                )}
                {zahlung.zahlungKomm === "Lektionsabrechnung" && (
                  <div>Kommentar: {zahlung.zahlungKomm}</div>
                )}
                {zahlung.zahlungKomm !== "Lektionsabrechnung" && (
                  <div>
                    Abrechnung:{" "}
                    {this.abrechnungValue(zahlung.zahlungAbrechnung)}
                  </div>
                )}
              </p>
            </div>

            {zahlung.zahlungKomm != "Lektionsabrechnung" && (
              <div className="col-lg-4 col-md-4 col-sm-6 d-lg-block">
                <ul className="list-group pokus">
                  <Link
                    className="linkButton"
                    to={`/updateZahlung/${zahlung.zahlungIndex}/${student_index}`}
                  >
                    <li className="list-group-item update">
                      <i className="fa fa-edit pr-1">Ändern</i>
                    </li>
                  </Link>
                  <Example
                    deleteitem={this.onDeleteClick.bind(
                      this,
                      zahlung.zahlungIndex
                    )}
                    modalheading={`Löschen Zahlung: ${formatDateTime2(
                      zahlung.zahlungDatum
                    )}`}
                    message={
                      "Sind Sie sicher? Dadurch werden die Zahlung und alle damit verbundenen Daten gelöscht!"
                    }
                  />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ZahlungItem.propTypes = {
  deleteZahlung: PropTypes.func.isRequired,
};

export default connect(null, { deleteZahlung })(ZahlungItem);
