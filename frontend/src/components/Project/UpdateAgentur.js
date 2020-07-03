import React, { Component } from "react";
import { getAgentur, updateAgentur } from "../../actions/AgenturActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateAgentur extends Component {
  constructor() {
    super();

    this.state = {
      agenturIndex: "",
      agenturKurzname: "",
      agenturKomm: "",
      createdAt: "",
      updatedAt: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      agenturIndex,
      agenturKurzname,
      agenturKomm,
      createdAt,
      updatedAt,
    } = nextProps.agentur;

    this.setState({
      agenturIndex,
      agenturKurzname,
      agenturKomm,
      createdAt,
      updatedAt,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const UpdateAgentur = {
      agenturIndex: this.state.agenturIndex,
      agenturKurzname: this.state.agenturKurzname,
      agenturKomm: this.state.agenturKomm,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
    this.props.updateAgentur(
      UpdateAgentur,
      this.state.agenturIndex,
      this.props.history
    );
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getAgentur(id, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { agentur } = this.props.agentur;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Agentur {this.props.agentur.agenturKurzname} aktualisieren
                </h5>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.agenturKurzname,
                      })}
                      placeholder="Kurzname"
                      name="agenturKurzname"
                      value={this.state.agenturKurzname}
                      onChange={this.onChange}
                    />
                    {errors.agenturKurzname && (
                      <div className="invalid-feedback">
                        {errors.agenturKurzname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.agenturKomm,
                      })}
                      placeholder="Kommentar"
                      name="agenturKomm"
                      value={this.state.agenturKomm}
                      onChange={this.onChange}
                    />

                    {errors.agenturKomm && (
                      <div className="invalid-feedback">
                        {errors.agenturKomm}
                      </div>
                    )}
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

UpdateAgentur.propType = {
  updateAgentur: PropTypes.func.isRequired,
  getAgentur: PropTypes.func.isRequired,
  agentur: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur.agentur,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  updateAgentur,
  getAgentur,
})(UpdateAgentur);
