import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {  Col, Row, Grid, Button } from 'react-bootstrap';
import ProfileHeader from '../container/FriendProfile/HeaderContainer';
import SurveyInfo from '../container/FriendProfile/SurveyInfoContainer';
import FriendImages from '../container/FriendProfile/FriendImagesContainer';
import FriendEvents from '../container/FriendProfile/FriendEventsContainer';
import FriendFriends from '../container/FriendProfile/FriendFriendsContainer';

class FriendProfile extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    browserHistory.goBack();
  }

  render() {
    return(
        <Grid className='myProfile'>
            <ProfileHeader />
            <Row className="profile-data">
                <Col xs={12} md={6}>
                    <Button onClick={this.goBack} >Go Back</Button>
                    <SurveyInfo />
                    <FriendImages />
                </Col>
                <Col className="Events-and-Friends" xs={12} md={6}>
                    <FriendEvents />
                    <FriendFriends />
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

export default connect(mapStateToProps)(FriendProfile);
