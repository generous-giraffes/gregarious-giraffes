import React, { Component } from 'react';
import { Button, Col, Row, Thumbnail, PageHeader, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getProfileImage } from '../../actions/image';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
      this.props.getProfileImage(this.props.id);
    }

    render() {
      //add setTimeout and a transition from imageUpload so that the images do not change quickly here
      //maybe wait until a server response or until new props are recieved to push the browser history in imageUpload
      var message = null;
      setTimeout( () => {   message = this.props.profileImage ? null
      : (<Modal.Dialog>
            <Modal.Header>
                <Modal.Title>The image you uploaded was misplaced, please go back and upload another. Thanks!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button onClick={this.goBack} bsStyle="success">Back</Button>
            </Modal.Footer>
        </Modal.Dialog>)} , 2000)

      return(
        <Row className="profile-user">
            <Col className='profile-image' xs={12} md={4}>
            {message}
                <Thumbnail className='user-image' href="#" alt="Your image was lost, please go back and try uploading another" src={this.props.profileImage || '../../styles/assets/sadPup.jpg'} />
            </Col>
            <Col xs={12} md={8}>
                <PageHeader> {this.props.name}'s <h2>Page</h2>   <p><small>  As I say: {this.props.quote}</small></p></PageHeader>
                <Button onClick={()=>{browserHistory.push('/ImageUploader')}}>Upload a New Photo</Button>
          </Col>
        </Row>
      )

    }
}


function mapStateToProps(state) {
  return {
    email: state.reducers.isAuthorized.email,
    name: state.reducers.isAuthorized.name,
    profileImage: state.reducers.image.profileImage,
    quote: state.reducers.form.quote || state.reducers.isAuthorized.quote,
    species: state.reducers.isAuthorized.species,
    id: state.reducers.isAuthorized.id
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getProfileImage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
