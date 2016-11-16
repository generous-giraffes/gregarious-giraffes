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
    bloodType: state.reducers.form.bloodType || state.reducers.isAuthorized.bloodType,
    dob: state.reducers.form.dob || state.reducers.isAuthorized.dob,
    hobbies: state.reducers.form.hobbies || state.reducers.isAuthorized.hobbies,
    image: state.reducers.image.image || state.reducers.isAuthorized.image,
    quote: state.reducers.form.quote || state.reducers.isAuthorized.quote,
    season: state.reducers.form.season || state.reducers.isAuthorized.season,
    species: state.reducers.form.species || state.reducers.isAuthorized.species,
    trained: state.reducers.form.trained || state.reducers.isAuthorized.trained,
    id: state.reducers.isAuthorized.id
   }
}

export default connect(mapStateToProps)(SurveyInfo);
