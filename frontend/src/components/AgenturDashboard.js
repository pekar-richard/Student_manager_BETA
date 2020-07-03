import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAgenturs } from "../actions/AgenturActions";
import CreateAgenturButton from "./Project/CreateAgenturButton";
import AgenturItem from "./Project/AgenturItem";

class AgenturDashboard extends Component {
  componentDidMount() {
    this.props.getAgenturs();
  }

  render() {
    const { agenturs } = this.props.agentur;

    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="display-4 text-center">Alle Agenturen</h1>
              <br />
              <CreateAgenturButton />
              <br />
              <hr />
              {agenturs.map((agentur) => (
                <AgenturItem
                  key={agentur.agenturIndex}
                  agentur={agentur}
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

AgenturDashboard.propTypes = {
  getAgenturs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
});

export default connect(mapStateToProps, { getAgenturs })(AgenturDashboard);
