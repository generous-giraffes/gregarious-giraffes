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
    id: state.reducers.isAuthorized.id
   }
}

export default connect(mapStateToProps)(SurveyInfo);
