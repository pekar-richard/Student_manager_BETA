import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createAgentur } from "../../actions/AgenturActions";
import classnames from "classnames";

class AddAgentur extends Component {
  constructor() {
    super();

    this.state = {
      agenturKurzname: "",
      agenturKomm: "",
      createdAt: "",
      updatedAt: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newAgentur = {
      agenturKurzname: this.state.agenturKurzname,
      agenturKomm: this.state.agenturKomm,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
    this.props.createAgentur(newAgentur, this.props.history);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Agentur anlegen</h5>
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

AddAgentur.propTypes = {
  createAgentur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createAgentur })(AddAgentur);
