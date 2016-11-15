import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SurveyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      return(
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
      )

    }
}

function mapStateToProps(state) {
  return {
    email: state.reducers.friends.currentFriend.email,
    name: state.reducers.friends.currentFriend.name,
    bloodType: state.reducers.friends.currentFriend.bloodType,
    dob: state.reducers.friends.currentFriend.dob,
    hobbies: state.reducers.friends.currentFriend.hobbies,
    image: state.reducers.friends.currentFriend.image,
    quote: state.reducers.friends.currentFriend.quote,
    season: state.reducers.friends.currentFriend.season,
    species: state.reducers.friends.currentFriend.species,
    trained: state.reducers.friends.currentFriend.trained
   }
}

export default connect(mapStateToProps)(SurveyInfo);
