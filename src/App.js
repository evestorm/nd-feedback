import React, { Component } from 'react';
import Sidebar from './Sidebar';
import TopBar from "./TopBar";
import Charts from './Charts';
import { Route, Link } from 'react-router-dom';
import Band from './Band';

import scriptLoader from "react-async-script-loader";


class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path='/' render= { () => (
          <div class="wrapper ">
            <Sidebar nd="band"/>
            <div className="main-panel">
              { /*Navbar*/ }  
              <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <a className="navbar-brand" href="#pablo">BAND</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                  </button>
                </div>
              </nav>
              { /*End Navbar*/ }
              <div className="content">
                <div className="container-fluid">
                  <TopBar/>
                  <Charts gh="https://github.com/udacity/band-issues-cn"/>
                </div>
              </div>
            </div>
          </div>
        )} />

        <Route exact path='/dand' render= { () => (
          <div class="wrapper ">
            <Sidebar nd="dand"/>
            <div className="main-panel">
              { /*Navbar*/ }  
              <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <a className="navbar-brand" href="#pablo">DAND</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                  </button>
                </div>
              </nav>
              { /*End Navbar*/ }
              <div className="content">
                <div className="container-fluid">
                  <TopBar/>
                  <Charts gh="https://github.com/udacity/DAND-CN-feedback"/>
                </div>
              </div>
            </div>
          </div>
        )} />


        <Route exact path='/mlnd' render= { () => (
          <div class="wrapper ">
            <Sidebar nd="mlnd"/>
            <div className="main-panel">
              { /*Navbar*/ }  
              <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <a className="navbar-brand" href="#pablo">MLND</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                  </button>
                </div>
              </nav>
              { /*End Navbar*/ }
              <div className="content">
                <div className="container-fluid">
                  <TopBar/>
                  <Charts gh="https://github.com/udacity/mlnd-issues-zh"/>
                </div>
              </div>
            </div>
          </div>
        )} />


        <Route exact path='/dlnd' render= { () => (
          <div class="wrapper ">
            <Sidebar nd="dlnd"/>
            <div className="main-panel">
              { /*Navbar*/ }  
              <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                  <div className="navbar-wrapper">
                    <a className="navbar-brand" href="#pablo">DLND</a>
                  </div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                  </button>
                </div>
              </nav>
              { /*End Navbar*/ }
              <div className="content">
                <div className="container-fluid">
                  <TopBar/>
                  <Charts gh="https://github.com/udacity/cn-dlnd-issue-reports"/>
                </div>
              </div>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default scriptLoader(
  `./assets/js/core/jquery.min.js`,
  `./assets/js/core/popper.min.js`,
  `./assets/js/core/bootstrap-material-design.min.js`,
  `./assets/js/plugins/perfect-scrollbar.jquery.min.js`,
  `./assets/js/plugins/bootstrap-notify.js`,
  `./assets/js/material-dashboard.min.js?v=2.1.0`
)(App);
