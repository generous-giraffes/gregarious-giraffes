import React from 'react';
import { Component } from 'react';
import AppContainer from '../../container/AppContainer';

//Import the main scss file
import style from '../../styles/style.scss';

class App extends Component {
    render() {
        return (
            <AppContainer>
                {this.props.children}
            </AppContainer>
        );
    }
}
export default App;
