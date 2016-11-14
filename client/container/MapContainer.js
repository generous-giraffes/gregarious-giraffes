import React, {PropTypes, Component} from 'react';
import { Modal, Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import GoogleMap from 'google-map-react';
import SearchBox from './SearchBoxContainer';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center:  {lat: 40.765091, lng: -73.968285},
    zoom: 12,
    //array of parks to map in render, to get parks displaying on the map
    parks: [
      {name:'Madison Square Park', coord: {lat: 40.7420371, lng: -73.98756349999996}},//inserted in map, get lng ant lat for parks around the city
      {name:'Central Park', coord: {lat: 40.782864, lng:-73.96535510000001}},
      {name:'Union Square Dog Run', coord: {lat:40.73560380000001, lng:-73.99096989999998}},
      {name:'Bryant Park', coord: {lat:40.7535965, lng:-73.98323260000001}},
      {name:'Leroy St Dog Run', coord: {lat:40.7303804, lng:-74.010962}},
      {name:'Carl Schurz Park', coord: {lat:40.7751302, lng:-73.9436973}},
      {name:'Chelsea Waterside Park', coord: {lat:40.7494938, lng:-74.0074459}},
      {name:'Corlears Hook Park', coord: {lat:40.71169649999999, lng:-73.97969720000003}}
    ]
  //when use default props over setting initial state?
  //should this go in store?, should the state also go in the store?


// Should I use component state to store X?
  // If I can calculate X from props -> No.
  // If I am not using X in the render method -> No.
  // Else -> Yes.
  };

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      modal: '',
      isOpen: false
    }
  }

  close() {
    // this.setState({ isOpen: false });
    this.setState({ modal: '' })
  }
//uncomment these functions and the <Modal ..> in showData to fix modal logic?
  // open() {
  //   this.setState({ isOpen: true });
  // }

  showData(e) {
    console.log('event current target, e',e.currentTarget.innerText,);
    console.log(this.state, 'state');
    this.setState({
      // isOpen: true,
      modal: (
        // <Modal className='event-modal' show={this.state.isOpen} onHide={() => {this.isOpen()}}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Create an Event</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    {e.currentTarget.innerText}
                    {/* <Button onClick={alert('hey')} bsStyle="success">Create an Event</Button> */}
                    <Button onClick={() => {this.close()}} bsStyle="success">Look at Other Parks</Button>
                </Modal.Footer>
            </Modal.Dialog>
        // </Modal>
      )
    })
  }

  render() {
    return (
      <div className='map'>
        <Grid>
          <Row className="mapSearch">
            <Col xs={12}>
              {this.state.modal}

              <SearchBox></SearchBox>

              <div className="extra">
                <GoogleMap className="extra"
                           bootstrapURLKeys={{key: 'AIzaSyCzQe1AnEIoJJcPIrfOXVTldfdUhxMY7kw'}}
                           defaultCenter={this.props.center}
                           defaultZoom={this.props.zoom}>
                  {this.props.parks.map((park) =>
                    <MyGreatPlace className="test" showData={(e) => {this.showData(e)}} {...park.coord}
                                text={park.name}  />
                  )}
                  {/* <MyGreatPlace className="test" showData={this.showData} {...this.props.centralPark}
                                text={'Central Park'} /> */}
                </GoogleMap>
              </div>
            </Col>
          </Row>
        </Grid>
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

  render() {
    return (
       <div onClick={this.props.showData} style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
