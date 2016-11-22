import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';

//Import the main scss file
import style from '../styles/style.scss';


//This is the main component of the app feeding in the styles, navbar and footer
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
