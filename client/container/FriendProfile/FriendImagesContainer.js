import React, {Component} from 'react';
import { Row, Col, Grid, Thumbnail, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitUserImage, getUserImages } from '../../actions/image';//change these
import UserImageUpload from './UserImageUploadContainer'
//use friends reducer
class FriendImages extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUserImages(this.props.id);
        console.log('getuser images submitted');
    }


    render() {
        return (
            <Grid className="photos">
                <UserImageUpload />
                <Row>
                {this.props.images.map((image) => (
                  <Col xs={12} md={6}>
                      <Thumbnail src={image.image}>
                          <img src={image.uri}/>
                          <h3>{image.caption}</h3>
                      </Thumbnail>
                  </Col>
                ))}
                </Row>
            </Grid>
        )

    }
}

function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,//change these
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        images: state.reducers.image.UserImages
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitUserImage, getUserImages}, dispatch);//change these
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendImages);
