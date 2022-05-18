import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {useParams} from "react-router"
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { setCurrentAdmin, logoutAdmin } from "./actions/adminAuthAction";
import { Provider } from "react-redux";
import store from "./store";

//user
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Tool from "./components/tool/tool";
import ConsultantInfo from "./components/tool/consultantInfo";
import CreatePatient from "./components/dashboard/CreateArticle1";
import BuySpace from "./components/dashboard/buySpace";
import BuyWithCard from "./components/dashboard/card/card"
import Error404 from "./components/dashboard/404error"
import Map from './components/dashboard/map';
import Profile from "./components/dashboard/profile";

//admin
import AdminPrivateRoute from "./components/private-route/adminPrivateRoute";
import AdminRegister from "./components/admin/auth/Register";
import AdminLogin from "./components/admin/auth/Login"
import AdminDashboard from "./components/admin/admin-dashboard/dashboard";
import AdminPatients from "./components/admin/patients/patients";
import AdminDoctors from "./components/admin/doctors/doctors";
import AdminTransactions from "./components/admin/transactions/transactions";
import PrivacyPolicy from "./components/auth/privacy";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  const plan = localStorage.plan;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch({type: 'SET_PLAN_WITH_CARD', payload: plan});
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

if (localStorage.adminjwtToken) {
  // Set auth token header auth
  const token = localStorage.adminjwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentAdmin(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());

    // Redirect to login
    window.location.href = ".admin/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            {/* <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> */}
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/admin" component={AdminLogin} />
              <Route exact path="/admin/login" component={AdminLogin} />
              {/* <Route exact path="/admin/register" component={AdminRegister} /> */}
              {/* <PrivateRoute path="/" component={Login} /> */}
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create" component={CreatePatient} />
              <PrivateRoute path="/buy-space" component={BuySpace} />
              <PrivateRoute path="/map" component={Map} />
              <PrivateRoute path="/:id/profile" component={Profile} />
              <PrivateRoute path="/buy-space-with-card" component={BuyWithCard} />
              <PrivateRoute exact path="/patient/view/:id" component={Tool} />
              <PrivateRoute path="/patient/view/:id/consultant-info" component={ConsultantInfo} />
              {/* <PrivateRoute path="*" component={Error404} />  */}
              {/* admin Router */}
              <AdminPrivateRoute exact path="/admin" component = {AdminDoctors} />
              {/* <AdminPrivateRoute exact path="/admin/dashboard" component = {AdminDashboard} /> */}
              <AdminPrivateRoute exact path="/admin/patients" component = {AdminPatients} />
              <AdminPrivateRoute exact path="/admin/doctors" component = {AdminDoctors} />
              <AdminPrivateRoute exact path="/admin/transactions" component = {AdminTransactions} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
export default App;
