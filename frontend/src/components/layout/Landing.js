import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navigation from './components/navigation';
import Header from './components/header';
import Features from './components/features';
import About from './components/about';
import Services from './components/services';
import Gallery from './components/gallery';
import Testimonials from './components/testimonials';
// import Team from './components/Team';
import Contact from './components/contact';
import JsonData1 from './data/data_en.json';
import JsonData2 from './data/data_fr.json';
import JsonData3 from './data/data_it.json';
import JsonData4 from './data/data_pt.json';
import JsonData5 from './data/data_es.json';
import { connect } from "react-redux";

export class App extends Component {
  state = {
    landingPageData: {},
  }

  getlandingPageData(flag) {
      switch (flag){
        case "1" : 
          return this.setState({landingPageData : JsonData1})
        case "2" : 
          return this.setState({landingPageData : JsonData2})
        case "3" : 
          return this.setState({landingPageData : JsonData3})
        case "4" : 
          return this.setState({landingPageData : JsonData4})
        case "5" : 
          return this.setState({landingPageData : JsonData5})
        default:
          return null;
  }
  }

componentWillMount  () {
    console.log(this.state.landingPageData)
    console.log(this.props.translator.translateFlag)
    this.getlandingPageData(this.props.translator.translateFlag);
  }

  componentWillReceiveProps(nextProps){
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    if(this.props.translator.translateFlag !== nextProps.translator.translateFlag){ 
      this.getlandingPageData(nextProps.translator.translateFlag);
    }
}

  render() {
    return (
      <div>
        <Navigation data = {this.state.landingPageData.Nav} />
        <Header data={this.state.landingPageData.Header} />
        {/* <Features data={this.state.landingPageData.Features} /> */}
        <About data={this.state.landingPageData.About} />
        <Gallery data={this.state.landingPageData.Gallery} />
        <Services data={this.state.landingPageData.Service} />
        {/* <Testimonials data={this.state.landingPageData.Testimonials} /> */}
        {/* <Team data={this.state.landingPageData.Team} /> */}
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  translator: state.translator,
});

export default connect(
  mapStateToProps
)(withRouter(App));
