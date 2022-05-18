import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../admin/navbar/navbar"

const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAdminAuthenticated === true ? (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.adminAuth
});

export default connect(mapStateToProps)(AdminPrivateRoute);
