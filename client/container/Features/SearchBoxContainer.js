import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func
  }

  render() {
    return <input {...this.props}
              placeholder='Enter Address'
              id='mapSearch'
              style={{'width': '300px'}}
              ref="input"
              type="text"
            />;
  }
}

export default SearchBox;
