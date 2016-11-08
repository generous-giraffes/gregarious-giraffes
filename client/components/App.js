import React from 'react';
//import Navbar from './Navbar';
//import Footer from './Footer';
import { Component } from 'react';

export default class App extends Component {
    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <div className="app">
                {this.props.children}
            </div>
        );
    }
}


