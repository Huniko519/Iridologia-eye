import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link';
import Flag from 'react-flagkit';
import { IconButton, FormControl, MenuItem } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { connect } from "react-redux";
import { TranslateAction } from "../../../actions/translateAction";

import { withStyles } from '@material-ui/core/styles';
import Muiselect from '@material-ui/core/Select';


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
    countflag: 4
  }

  ChangeLanguage = (flag) => dispatch => {
    this.props.TranslateAction(flag);
  }

  handleChange = (event) => {
    console.log("handle: " + event.target.value)
    this.setState({
      countflag: event.target.value
    })
  };

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
              <li>
                <NavHashLink to="#about" className="page-scroll">
                  {this.props.data ? this.props.data.about : 'loading...'}
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="#portfolio" className="page-scroll">
                  {this.props.data ? this.props.data.gallery : 'loading...'}
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="#buy-space" className="page-scroll">
                {this.props.data ? this.props.data.buySpace : 'loading...'}
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="#testimonials" className="page-scroll">
                  {this.props.data ? this.props.data.testimonials : 'loading...'}
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="#contact" className="page-scroll">
                  {this.props.data ? this.props.data.contact : 'loading...'}
                </NavHashLink>
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
});

export default connect(
  mapStateToProps, { TranslateAction }
)(withRouter(Navigation));
