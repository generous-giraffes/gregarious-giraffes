import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Panel, PageHeader, Modal, Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, ListGroup, ListGroupItem } from 'react-bootstrap';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open1: false, open2: false }
    this.goBack.bind(this);
  }

  goBack() {
    browserHistory.push('/imageUploader');
  }

  render() {
    //add setTimeout and a transition from imageUpload so that the images do not change quickly here
    //maybe wait until a server response or until new props are recieved to push the browser history in imageUpload
    var message = null;
    setTimeout( () => {   message = this.props.image ? null
    : (<Modal.Dialog>
          <Modal.Header>
              <Modal.Title>The image you uploaded was too large, please go back and upload an image smaller than 1.6mb! Thanks!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button onClick={this.goBack} bsStyle="success">Back</Button>
          </Modal.Footer>
      </Modal.Dialog>)} , 2000)

    return(
      // <div className="profile-container">
        <Grid className='myProfile'>
            <Row className="profile-user">
                <Col className='profile-image' xs={12} md={4}>
                    {message}
                    <Thumbnail className='user-image' href="#" alt="Your image was too large, please upload one that is less than 1.6mb" src={this.props.image || '../../styles/assets/sadPup.jpg'} />
                </Col>
                <Col xs={12} md={8}>
                    <PageHeader> {this.props.name}'s Page <small>  As I say:{this.props.quote}</small></PageHeader>
                </Col>
            </Row>
            <Row className="profile-data">
                <Col xs={12} md={6}>
                    <ListGroup>
                        <ListGroupItem header="Name: ">{this.props.name}</ListGroupItem>
                        <ListGroupItem header="Species: ">{this.props.species}</ListGroupItem>
                        <ListGroupItem header="Birthday: ">{this.props.dob}</ListGroupItem>
                        <ListGroupItem header="Favorite Season: ">{this.props.season}</ListGroupItem>
                        <ListGroupItem header="hobbies: ">{this.props.hobbies}</ListGroupItem>
                        <ListGroupItem header="Favorite Quote: ">{this.props.quote}</ListGroupItem>
                        <ListGroupItem header="House Trained: ">{this.props.trained}</ListGroupItem>
                        <ListGroupItem header="Contact me at: "><a href={'mailto:'+this.props.email}>{this.props.email}</a></ListGroupItem>
                    </ListGroup>
                </Col>
                <Col xs={12} md={6} className="Events-and-Friends">
                    <div className="events-div">
                        <Button className="events-btn" bsStyle="success" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
                            View Events
                        </Button>
                        <Panel collapsible expanded={this.state.open1}>
                            <Panel header="Madison Square Park" bsStyle="success">
                              <h2>Location: {this.props.location}</h2>
                            </Panel>
                            <Panel header="Central Park" bsStyle="success">
                              There is an Event in Central  Park.
                              Wednesday Novermber 20, 2016 at 9:00am
                            </Panel>
                        </Panel>
                    </div>
                    <div className="friends-div">
                        <Button className="friends-btn" bsStyle="primary" onClick={ ()=> this.setState({ open2: !this.state.open2 })}>
                            Your Friends
                        </Button>
                        <Panel collapsible expanded={this.state.open2}>
                            <Panel header="Benny" bsStyle="primary">
                              Benny likes to sleep and mess up the sofa
                            </Panel>
                            <Panel header="Margaret Thatcher" bsStyle="primary">
                              Margaret likes to be a classic dog
                            </Panel>
                        </Panel>
                    </div>
                </Col>
            </Row>
        </Grid>
      // </div>
    )
  }
}

//ADD SUBSCRIBE?
function mapStateToProps(state) {
  return {
    email: state.reducers.isAuthorized.email,
    name: state.reducers.isAuthorized.name,
    bloodType: state.reducers.form.bloodType,
    dob: state.reducers.form.dob,
    hobbies: state.reducers.form.hobbies,
    image: state.reducers.image.image,
    quote: state.reducers.form.quote,
    season: state.reducers.form.season,
    species: state.reducers.form.species,
    trained: state.reducers.form.trained,
    time: state.reducers.eventForm.time,
    date: state.reducers.eventForm.date,
    gifts: state.reducers.eventForm.gifts,
    danger: state.reducers.eventForm.danger,
    animals: state.reducers.eventForm.animals,
    eating: state.reducers.eventForm.eating,
    location: state.reducers.eventForm.location
   }
}

export default connect(mapStateToProps)(MyProfile);
