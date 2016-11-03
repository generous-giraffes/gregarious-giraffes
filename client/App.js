import React from 'react';
import ReactDOM from 'react-dom';
import style from './sass/styles.scss';

class World extends React.Component {
  render() {
    return <h1>Test World</h1>
  }
}

ReactDOM.render(<World/>, document.getElementById('app'));