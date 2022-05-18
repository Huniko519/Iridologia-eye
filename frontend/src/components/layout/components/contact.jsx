import React, { Component } from "react";
import Axios from "axios";
import swal from 'sweetalert';
export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    }
  }
  sendMessage = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      url: "/api/messages/send-message",
      data: {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      }
    }).then((res) => {
      console.log(res)
      swal("WELCOME!", "Message just sent successfully ", "success");
    })
  }

  changeNameHandler = (e, i) => {
    console.log(e.target.value)
    var tempName = e.target.value;
    this.setState({ name: tempName })
  }
  changeEmailHandler = (e) => {
    var tempEmail = e.target.value;
    this.setState({ email: tempEmail })
  }
  changeMessageHandler = (e) => {
    var tempMessage = e.target.value;
    this.setState({ message: tempMessage })
  }
  render() {
    return (
      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-8 mob-title-bottom">
              <div className="row">
                <div className="section-title">
                  <h2>{this.props.data ? this.props.data.title : "loading"}</h2>
                  <p>{this.props.data ? this.props.data.paragraph : "loading"}</p>
                </div>
                <form name="sentMessage" id="contactForm" onSubmit={this.sendMessage}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control goodIdea"
                          placeholder={this.props.data ? this.props.data.inputName : "loading"}
                          required="required"
                          onChange={this.changeNameHandler}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control goodIdea"
                          placeholder={this.props.data ? this.props.data.inputEmail : "loading"}
                          required
                          onChange={this.changeEmailHandler}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder={this.props.data ? this.props.data.inputMessage : "loading"}
                      required="required"
                      onChange={this.changeMessageHandler}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    {this.props.data ? this.props.data.submitButton : "loading"}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info mob-contact-info">
              <div className="contact-item">
                <h3>{this.props.data ? this.props.data.mailTitle : "loading"}</h3>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> {this.props.data ? this.props.data.mailTitle1 : "loading"}
                  </span>{" "}
                  {this.props.data ? this.props.data.email : "loading"}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a
                        href={this.props.data ? this.props.data.facebook : "/"}
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={this.props.data ? this.props.data.twitter : "/"}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={this.props.data ? this.props.data.youtube : "/"}>
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="footer">
          <div className="container text-center">
            <p>
              &copy; 2020 Issaaf Kattan React Land Page Template. Design by{" "}
              <a href="http://www.templatewire.com" rel="nofollow">
                TemplateWire
              </a>
            </p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Contact;
