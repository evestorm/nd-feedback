import React, { Component } from 'react';
import TopBar from "./TopBar";
import Charts from './Charts';
import { Route, Link } from 'react-router-dom';

class Band extends Component {

    render() {

        // 初始化chart
        var userDom = document.getElementById("usersChart"),
            labelDom = document.getElementById("labelsChart"),
            timelineDom = document.getElementById("timelineChart");
        console.log(userDom, labelDom, timelineDom);
        
        return (
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
                    <Charts/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Band;
