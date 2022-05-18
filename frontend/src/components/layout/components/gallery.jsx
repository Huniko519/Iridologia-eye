import React, { Component } from "react";

export class Gallery extends Component {
  render() {
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>{this.props.data ? this.props.data.title : 'loading...'}</h2>
          </div>
          <div className="row">
            <div className="portfolio-items">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <video src="video/free.mp4" className="img-responsive" width="750" height="500" autoPlay/>
                <br />
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <video src="video/basic.mp4" className="img-responsive" width="750" height="500" controls>
                </video>
                <br />
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <video src="video/professional.mp4" className="img-responsive" width="750" height="500" controls>
                </video>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
