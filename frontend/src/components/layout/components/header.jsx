import React, { Component } from "react";
import {Link} from "react-router-dom"

export class Header extends Component {
  render() {
    return (
      <div class = "Home_container"> 
              <div className="row" style = {{paddingTop: "53vh"}}>
                  <p style = {{marginLeft: "40vw"}}>
                    {this.props.data ? this.props.data.paragraph : "Loading"}
                  </p>
                  <Link to  = "/login"
                    className="btn btn-custom btn-lg page-scroll"
                    style = {{margin: "auto", marginTop: "250px"}}
                  >
                    {this.props.data ? this.props.data.start : "Loading"}
                  </Link>{" "}
              </div>
      </div> 
    );
  }
}

export default Header;
