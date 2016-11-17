import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';



//Import the main scss file
import style from '../styles/style.scss';
import img from '../styles/assets/pawprint.png';
import img2 from '../styles/assets/sadpup.jpg';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
