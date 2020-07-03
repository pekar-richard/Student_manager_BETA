import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLektion } from "../../actions/LektionActions";
import { formatDateTime, formatDateTime2 } from "../../tools";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { getAgenturs } from "../../actions/AgenturActions";
import { Example } from "./Example";

class LektionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agenturs: [],
      agenturKurzname: "",
    };
  }

  onDeleteClick = (id) => {
    this.props.deleteLektion(id);
  };

  componentDidMount() {
    this.props.getAgenturs();
  }

  static getDerivedStateFromProps(props, state) {
    const { agenturs } = props.agentur;
    const { lektionIndex } = props;

    return {
      agenturs,
    };
  }

  render() {
    const { lektion } = this.props;
    const { increment } = this.props;
    const { agenturs } = this.props.agentur;

    let currentTime = new Date().getTime();
    let lektionTime = new Date(lektion.lektionDatum).getTime();

    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            currentTime > lektionTime ? "lektion-in-future" : "lektion-in-past"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{/*increment*/}</span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-4 ">
              <h4>{formatDateTime2(lektion.lektionDatum)}</h4>

              <p>
                Dauer: {lektion.lektionMin} min. <br /> Preis:{" "}
                {lektion.lektionPreis} Euro <br /> Agentur:{" "}
                {agenturs.map(
                  (agentur) =>
                    lektion.agenturIndex === agentur.agenturIndex &&
                    agentur.agenturKurzname
                )}
                <br />
                <br />
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-lg-block">
              <ul className="list-group pokus">
                <Link
                  className="linkButton"
                  to={`/updateLektion/${lektion.lektionIndex}/${lektion.studentIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">Ändern</i>
                  </li>
                </Link>
                <Example
                  deleteitem={this.onDeleteClick.bind(
                    this,
                    lektion.lektionIndex
                  )}
                  modalheading={`Löschen Lektion: ${formatDateTime2(
                    lektion.lektionDatum
                  )}`}
                  message={
                    "Sind Sie sicher? Dadurch werden die Lektion und alle damit verbundenen Daten gelöscht!"
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

LektionItem.propTypes = {
  deleteLektion: PropTypes.func.isRequired,
  getAgenturs: PropTypes.func.isRequired,
  agentur: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
});

export default connect(mapStateToProps, { deleteLektion, getAgenturs })(
  LektionItem
);
