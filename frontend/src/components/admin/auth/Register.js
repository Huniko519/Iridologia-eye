import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/adminAuthAction";
import classnames from "classnames";
import Navbar from "../navbar/navbar";

import JsonData1 from '../../layout/data/data_en.json';
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';
// import { startSession } from "mongoose";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  state = {
    landingPageData: {}
  }

  getlandingPageData(flag) {
    switch (flag) {
      case "1":
        console.log("1 selected")
        return this.setState({ landingPageData: JsonData1 })
      case "2":
        return this.setState({ landingPageData: JsonData2 })
      case "3":
        return this.setState({ landingPageData: JsonData3 })
      case "4":
        return this.setState({ landingPageData: JsonData4 })
      case "5":
        return this.setState({ landingPageData: JsonData5 })
      default:
        return null;
    }
  }

  componentWillMount() {
    console.log(this.state.landingPageData)
    console.log(this.props.translator.translateFlag)
    this.getlandingPageData(this.props.translator.translateFlag);
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps.translator.translateFlag)
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    if (this.props.translator.translateFlag !== nextProps.translator.translateFlag) {
      this.getlandingPageData(nextProps.translator.translateFlag);
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <Navbar data={this.state.landingPageData.Nav} />
        <div className="row">
          <div className="col s8 offset-s2 register-page" style={{ marginTop: "100px" }}>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              {this.state.landingPageData ? this.state.landingPageData.Register.backHome : "loading"}
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                {this.state.landingPageData ? this.state.landingPageData.Register.registerBelow : "loading"}
              </h4>
              <p className="grey-text text-darken-1">
                {this.state.landingPageData ? this.state.landingPageData.Register.haveAccount : "loading"} <Link to="/login">{this.state.landingPageData ? this.state.landingPageData.Register.toLogin : "loading"}</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("goodIdea", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">{this.state.landingPageData ? this.state.landingPageData.Register.name : "loading"}</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("goodIdea", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">{this.state.landingPageData ? this.state.landingPageData.Register.email : "loading"}</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("goodIdea", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">{this.state.landingPageData ? this.state.landingPageData.Register.password : "loading"}</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("goodIdea", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">{this.state.landingPageData ? this.state.landingPageData.Register.repassword : "loading"}</label>
                <span className="red-text ">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  {this.state.landingPageData ? this.state.landingPageData.Register.button : "loading"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth,
  errors: state.errors,
  translator: state.translator
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
