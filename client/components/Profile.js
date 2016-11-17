import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {  Col, Row, Grid } from 'react-bootstrap';
import ProfileHeader from '../container/Profile/HeaderContainer';
import EventInfo from '../container/Profile/EventsContainer';
import Friends from '../container/Profile/FriendsContainer';
import SurveyInfo from '../container/Profile/SurveyInfoContainer';
import Photos from '../container/Profile/PhotoContainer';

class MyProfile extends React.Component {

  render() {
    return(
        <Grid className='myProfile'>
            <ProfileHeader />
            <Row className="profile-data">
                <Col xs={12} md={6}>
                    <SurveyInfo />
                    <Photos />
                </Col>
                <Col xs={12} md={6} className="Events-and-Friends">
                    <EventInfo />
                    <Friends />
                </Col>
            </Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.reducers.isAuthorized.email,
    name: state.reducers.isAuthorized.name,
    id: state.reducers.isAuthorized.id
   }
}

export default connect(mapStateToProps)(MyProfile);
