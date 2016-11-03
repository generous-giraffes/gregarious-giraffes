import React from 'react';
import ReactDOM from 'react-dom';
import { OAuthSignInButton } from "redux-auth/material-ui-theme";
import style from './sass/styles.scss';

class World extends React.Component {
    render() {
        return <div>Hey</div>
    }
}

ReactDOM.render(<World/>, document.getElementById('app'));

