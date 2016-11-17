import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {  Col, Row, Grid, Button } from 'react-bootstrap';
import ProfileHeader from '../container/FriendProfile/HeaderContainer';
import SurveyInfo from '../container/FriendProfile/SurveyInfoContainer';

class FriendProfile extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    browserHistory.goBack();
  }

  friend() {

  }

  render() {
    return(
        <Grid className='myProfile'>
            <ProfileHeader />
            <Row className="profile-data">
                <Col xs={12} md={12}>
                    <Button onClick={this.goBack} >Go Back</Button>
                    <SurveyInfo />
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