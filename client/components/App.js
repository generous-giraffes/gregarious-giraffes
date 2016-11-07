import React from 'react';
import { Component } from 'react';

//Import the main scss file
import style from '../styles/style.scss';

class App extends React.Component {

    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default App

