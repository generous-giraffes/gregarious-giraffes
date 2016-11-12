import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func
  }
  // constructor(props) {
  //   super(props)
  //   this.onPlacesChanged.bind(this)
  // }

  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }

  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }

  render() {
    // return <input ref="input" {...this.props} type="text"/>;
    return <input ref="input" type="text"/>;
  }
}

export default SearchBox;
