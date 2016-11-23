import React, { Component } from 'react';
import { Button, Col, Row, Thumbnail, PageHeader, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

      return(
        <Row className="profile-user">
            <Col className='profile-image' xs={12} md={4}>
                <Thumbnail className='user-image' href="#" alt="looks like we can't find this image, try again later" src={this.props.image || '../../styles/assets/sadPup.jpg'} />
                </Col>
            <Col xs={12} md={8}>
                <PageHeader> {this.props.name}'s <h2>Page</h2>  <p><small>  As I say:{this.props.quote}</small></p></PageHeader>
          </Col>
        </Row>
      )

    }
}


function mapStateToProps(state) {
  return {
    email: state.reducers.friends.currentFriend.email,
    name: state.reducers.friends.currentFriend.name,
    image: state.reducers.friends.currentFriend.image,
    quote: state.reducers.friends.currentFriend.quote,
    species: state.reducers.friends.currentFriend.species
  }
}

export default connect(mapStateToProps)(ProfileHeader);
