import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string
    // ,
    // onPlacesChanged: React.PropTypes.func
  }

  onPlacesChanged = () => {
    console.log('CHANGED');
    console.log('CHANGED2', this.searchBox.getPlaces());
    let place = this.searchBox.getPlaces();
//dispatch action to oupdate state with place
    //formatted_address ---> "Madison Ave, New York, NY 10010, USA"
    //location.lat() ,   .lng
    //opening_hours --- .open_now -- true or false, .weekday_text[0]..[6] each weekday hours
    // .photos //array of objects with getUrl() which returns url
    //.ratimg //out of 5
    //.reviews //array of objects each with :
      // author_name: "Shahajahan Pial"
      // author_url: "https://plus.google.com/109927478079682620707"l anguge: "en"
      // profile_photo_url: "//lh4.googleusercontent.com/-W7xBOOpnzWU/AAAAAAAAAAI/AAAAAAAABqo/QW7BQ0bpq20/photo.jpg"
      // rating: 5
      // text: "An awesome p

    // if (this.props.onPlacesChanged) {
    //   this.props.onPlacesChanged(this.searchBox.getPlaces());
    // }
  }

  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    // this.searchBox.addListener('places_changed', this.props.handlePlacesChange);
  }

  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }

  render() {
    // return <input ref="input" {...this.props} type="text"/>;
    return <input {...this.props} id='mapSearch' style={{'width': '300px'}} ref="input" type="text"/>;
  }
}

export default SearchBox;
