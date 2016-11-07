import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

//Import the main scss file
import style from '../styles/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Navbar />
                {/*This refers to the nested route components*/}
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default App

