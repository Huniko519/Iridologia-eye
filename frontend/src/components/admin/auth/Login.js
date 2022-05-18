import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/adminAuthAction";
import classnames from "classnames";
import Navbar from "../navbar/navbar"

import JsonData1 from '../../layout/data/data_en.json';
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';

// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAdminAuthenticated) {
      this.props.history.push("/admin/doctors");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.translator.translateFlag)
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    if (this.props.translator.translateFlag !== nextProps.translator.translateFlag) {
      this.getlandingPageData(nextProps.translator.translateFlag);
    }
    if (nextProps.auth.isAdminAuthenticated) {
      this.props.history.push("/admin/doctors");
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <Navbar data={this.state.landingPageData.Nav} />
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2 login-page" style={{ marginTop: "50px" }}>

            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              {this.state.landingPageData ? this.state.landingPageData.Login.backHome : "loading"}
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                {this.state.landingPageData ? this.state.landingPageData.Login.loginBelow : "loading"}
              </h4>
            </div>
            {/* <form noValidate onSubmit={this.onSubmit} autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="email">123123123</InputLabel>
                <Input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("goodIdea", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                  aria-describedby="my-helper-text"
                />

              </FormControl>
              <FormControl>
                <InputLabel htmlFor="password">Email address</InputLabel>
                <Input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("goodIdea", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  aria-describedby="my-helper-text1"
                />

              </FormControl>
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
                {this.state.landingPageData ? this.state.landingPageData.Login.button : "loading"}
              </button>
            </form> */}
            {/* <form noValidate onSubmit={this.onSubmit} autoComplete="off">
              <TextField 
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("goodIdea", {
                    invalid: errors.email || errors.emailnotfound
                  })}
              />
              <TextField 
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("goodIdea", {
                    invalid: errors.email || errors.emailnotfound
                  })}
              />
            </form> */}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("goodIdea", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">{this.state.landingPageData ? this.state.landingPageData.Login.email : "loading"}</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("goodIdea", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">{this.state.landingPageData ? this.state.landingPageData.Login.password : "loading"}</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
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
                  {this.state.landingPageData ? this.state.landingPageData.Login.button : "loading"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.adminAuth,
  errors: state.errors,
  translator: state.translator
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
