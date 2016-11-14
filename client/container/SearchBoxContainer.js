import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPlacesChanged: React.PropTypes.func
  }

  onPlacesChanged = () => {
    console.log('CHANGED2', this.searchBox.getPlaces());
    let place = this.searchBox.getPlaces();
    console.log(place,"--========__", 'lat', place[0].geometry.location.lat(), 'lng',place[0].geometry.location.lng())
    console.log('{lat:' + place[0].geometry.location.lat() + ', '+ 'lng:' + place[0].geometry.location.lng() + '}')
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
    return <input {...this.props}
              placeholder='Search for a Park'
              id='mapSearch'
              style={{'width': '300px'}}
              ref="input"
              type="text"
            />;
  }
}

export default SearchBox;
