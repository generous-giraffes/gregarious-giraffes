import React, {PropTypes, Component} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import SearchBox from './searchBox';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center:  {lat: 40.785091, lng: -73.968285},
    zoom: 9,
    madisonSquarePark: {lat: 40.7420371, lng: -73.98756349999996}//inserted in map, get lng ant lat for parks around the city
  };

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.handlePlacesChange.bind(this);
    this.showData.bind(this);
  }

  handlePlacesChange() {
    let park = this.searchBox.getPlaces()
    console.log(park,"--========__")

    // console.log(e, '+++++++++++');
    // console.log('lat',e[0].geometry.location.lat(), '++++++lng+++++',e[0].geometry.location.lng());//to get lat
    //e[0].formatted_address ---> "Madison Ave, New York, NY 10010, USA"
    //e[0].location.lat() ,   .lng
    //e[0].opening_hours --- .open_now -- true or false, .weekday_text[0]..[6] each weekday hours
    // .photos //array of objects with getUrl() which returns url
    //.ratimg //out of 5
    //.reviews //array of objects each with :
      // author_name: "Shahajahan Pial"
      // author_url: "https://plus.google.com/109927478079682620707"l anguge: "en"
      // profile_photo_url: "//lh4.googleusercontent.com/-W7xBOOpnzWU/AAAAAAAAAAI/AAAAAAAABqo/QW7BQ0bpq20/photo.jpg"
      // rating: 5
      // text: "An awesome place with 100% natural environment. Very good for biking or r

    // if (this.props.onPlacesChanged) {
    //   this.props.onPlacesChanged(this.searchBox.getPlaces());
    // }
  }

  showData(e) {
    //render cards with the parks info, option to create walking get to gether, create table in db for that
    console.log( e.currentTarget.innerText, '++++show data+++++');
    let park = e.currentTarget.innerText;
    // let model = (<div>{park}</div>)

    var event = new MouseEvent('enter', {
      'view': window,
      'bubbles': false,
      'cancelable': false
    });
    var node = document.getElementById('mapSearch');
    $(node).text(park)
    console.log(node,'0-ijr');
    node.dispatchEvent(event);
  }

  render() {
    let model = null;
    return (
      <div  className='map'>
      {/* <Grid>
        <Row> */}
        {model}
        <SearchBox
        // handlePlacesChange={this.handlePlacesChange}
        // onPlacesChanged={this.handlePlacesChanged}
        ></SearchBox>
          {/* <Col xs={12} md={8} xsOffset={4} mdOffset={4}> */}
          <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyCzQe1AnEIoJJcPIrfOXVTldfdUhxMY7kw'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          <MyGreatPlace showData={this.showData} lat={40.782864} lng={-73.96535510000001} text={'Central Park'} /* Kreyser Avrora */ />
          <MyGreatPlace showData={this.showData} {...this.props.madisonSquarePark} text={'Madison Square Park'} /* road circle */ />

          </GoogleMap>
          {/* </Col> */}
        {/* </Row>
      </Grid> */}
      </div>
    );
  }
}
const K_WIDTH = 40;
const K_HEIGHT = 40;
const greatPlaceStyle =  {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '3px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 6,
  fontWeight: 'bold',
  padding: 6
};

class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  // shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div onClick={this.props.showData} style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
