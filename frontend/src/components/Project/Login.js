import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLogin } from "../../actions/LoginActions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      message: "Sie haben keine gültigen Anmeldedaten eingegeben.",
      username: "",
      password: "",
      loginerror: "false",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newLogin = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.getLogin(newLogin, this.props.history);
  }
  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    this.setState({ loginerror: nextProps.login.loginerror });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="loginbox">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h4 font-weight-normal login_text">
            Anmeldung für registrierte Benutzer
          </h1>
          <label htmlFor="inputEmail" className="sr-only">
            Benutzername
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Benutzername"
            required
            value={this.state.username}
            onChange={this.onChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Passwort
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Passwort"
            required
            value={this.state.password}
            onChange={this.onChange}
          />
          {this.state.loginerror === "true" && <div>{this.state.message}</div>}
          <input
            value="Anmelden"
            type="submit"
            className="btn btn-primary btn-block mt-4 col-lg-12 col-md-12 col-sm-12"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  getLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { getLogin })(Login);
