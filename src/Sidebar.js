import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        const { nd } = this.props
        console.log(nd);
        
        return (
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo">
                    <Link className='simple-text logo-normal' to='/'>ND FEEDBACK</Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className={ nd === 'band' ? "nav-item active" : "nav-item"}>
                        <Link className='nav-link' to='/'>
                            <i className="material-icons"></i>
                            <p>BAND</p>
                        </Link>
                        </li>
                        <li className={ nd === 'dand' ? "nav-item active" : "nav-item"}>
                        <Link className='nav-link' to='/dand'>
                            <i className="material-icons"></i>
                            <p>DAND</p>
                        </Link>
                        </li>
                        <li className={ nd === 'mlnd' ? "nav-item active" : "nav-item"}>
                        <Link className='nav-link' to='/mlnd'>
                            <i className="material-icons"></i>
                            <p>MLND</p>
                        </Link>
                        </li>
                        <li className={ nd === 'dlnd' ? "nav-item active" : "nav-item"}>
                        <Link className='nav-link' to='/dlnd'>
                            <i className="material-icons"></i>
                            <p>DLND</p>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar