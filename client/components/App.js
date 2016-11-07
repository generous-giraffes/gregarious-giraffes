import React from 'react';
//import Navbar from './Navbar';
//import Footer from './Footer';
import { Component } from 'react';

//Import the main scss file
import style from '../styles/style.scss';

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


