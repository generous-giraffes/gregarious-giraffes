import React from 'react';
import ReactDOM from 'react-dom';

//Import the main scss file
import style from '../styles/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <p>Hello World</p>
            </div>
        )
    }
}

export default App

