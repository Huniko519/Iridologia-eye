import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link';
import Flag from 'react-flagkit';
import { IconButton, FormControl, MenuItem } from '@material-ui/core';
import Muiselect from '@material-ui/core/Select';
import { Box } from '@material-ui/core';
import { connect } from "react-redux";
import { TranslateAction } from "../../../actions/translateAction";

import { logoutAdmin } from "../../../actions/adminAuthAction";

import JsonData1 from '../../layout/data/data_en.json';
import JsonData2 from '../../layout/data/data_fr.json';
import JsonData3 from '../../layout/data/data_it.json';
import JsonData4 from '../../layout/data/data_pt.json';
import JsonData5 from '../../layout/data/data_es.json';

import { withStyles } from '@material-ui/core/styles';

const Select = withStyles({
  icon: {
    display: 'none'
  },
  select: {
    paddingRight: '12px!important',
    paddingLeft: '12px'
  }
})(Muiselect);

export class Navigation extends Component {
  state = {
    landingPageData: {},
    countflag: 4
  }

  handleChange = (event) => {
    console.log("handle: " + event.target.value)
    this.setState({
      countflag: event.target.value
    })
  };

  getlandingPageData(flag) {
    switch (flag) {
      case "1":
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

  componentWillReceiveProps(nextProps) {
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    if (this.props.translator.translateFlag !== nextProps.translator.translateFlag) {
      this.getlandingPageData(nextProps.translator.translateFlag);
    }
  }
  ChangeLanguage = (flag) => dispatch => {
    this.props.TranslateAction(flag);
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };
  show_total_patients = (e) => {
    this.props.history.push("/admin/patients")
  }
  show_total_doctors = (e) => {
    this.props.history.push("/admin/doctors")
  }
  show_total_transactions = (e) => {
    this.props.history.push("/admin/transactions")
  }
  render() {
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <div style={{ display: 'flex' }}>
              <a href="/" className="d-none">
                <img src="/eyelogo.png" alt="eyelogo" style={{ width: "69px", marginRight: "70px" }} />
              </a>
              <div className="web">
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <IconButton onClick={this.ChangeLanguage("1")}>
                    <Flag country="US" />
                  </IconButton>
                  <IconButton onClick={this.ChangeLanguage("2")}>
                    <Flag country="FR" />
                  </IconButton>
                  <IconButton onClick={this.ChangeLanguage("3")}>
                    <Flag country="IT" />
                  </IconButton>
                  <IconButton onClick={this.ChangeLanguage("4")}>
                    <Flag country="PT" />
                  </IconButton>
                  <IconButton onClick={this.ChangeLanguage("5")}>
                    <Flag country="ES" />
                  </IconButton>
                </Box>
              </div>
            </div>

            <div className="mobile">
              <a href="/" className="d-md-block">
                <img src="/eyelogo.png" alt="eyelogo" style={{ width: "69px", marginRight: "70px" }} />
              </a>
              <Box display={{ xs: 'block', sm: 'none' }} style={{ paddingRight: '10px' }}>
                <FormControl>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.countflag}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={1}> <IconButton onClick={this.ChangeLanguage("1")}>
                      <Flag country="US" />
                    </IconButton></MenuItem>
                    <MenuItem value={2}><IconButton onClick={this.ChangeLanguage("2")}>
                      <Flag country="FR" />
                    </IconButton></MenuItem>
                    <MenuItem value={3}><IconButton onClick={this.ChangeLanguage("3")}>
                      <Flag country="IT" />
                    </IconButton></MenuItem>
                    <MenuItem value={4}><IconButton onClick={this.ChangeLanguage("4")}>
                      <Flag country="PT" />
                    </IconButton></MenuItem>
                    <MenuItem value={5}><IconButton onClick={this.ChangeLanguage("5")}>
                      <Flag country="ES" />
                    </IconButton></MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              {/* <li>
                <a href="#features" className="page-scroll">
                  Features
                </a>
              </li> */}
              <li onClick={this.show_total_doctors}>
                <a className="page-scroll">
                  {this.state.landingPageData ? this.state.landingPageData.AdminNavbar.users : "loading"}
                </a>
              </li>
              <li onClick={this.show_total_patients}>
                <a className="page-scroll">
                  {this.state.landingPageData ? this.state.landingPageData.AdminNavbar.patients : "loading"}
                </a>
              </li>
              {/* <li onClick = {this.show_total_transactions}>
                <a className="page-scroll">
                  transactions
                </a>
              </li> */}
              <li onClick={this.onLogoutClick}>
                <a className="page-scroll">
                  {this.state.landingPageData ? this.state.landingPageData.AdminNavbar.logout : "loading"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  translator: state.translator,
  auth: state.adminAuth
});

export default connect(
  mapStateToProps, { logoutAdmin, TranslateAction }
)(withRouter(Navigation));
