import React, { Component } from 'react';

class TopBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">account_circle</i>
                            </div>
                            <p className="card-category">active user</p>
                            <h3 className="card-title" id="active-user">0
                            </h3>
                        </div>
                        <div className="card-footer">
                        
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-info card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">help</i>
                        </div>
                        <p className="card-category">All Issues</p>
                        <h3 className="card-title" id="all-issues">0</h3>
                        </div>
                        <div className="card-footer">
                        <div className="stats">
                            <i className="material-icons">insert_link</i>
                            <a href="https://github.com/udacity/band-issues-cn/issues?utf8=%E2%9C%93&q=is:issue+is:all+" target="_blank">Go to Github</a>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-success card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">check_circle</i>
                            </div>
                            <p className="card-category">Fixed Issues</p>
                            <h3 className="card-title" id="fixed-issues">0</h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">insert_link</i>
                                <a href="https://github.com/udacity/band-issues-cn/issues?q=is:issue+is:closed" target="_blank">Go to Github</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-danger card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">schedule</i>
                            </div>
                            <p className="card-category">Open Issues</p>
                            <h3 className="card-title" id="open-issues">0</h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">insert_link</i>
                                <a href="https://github.com/udacity/band-issues-cn/issues?q=is:open+is:issue" target="_blank">Go to Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar