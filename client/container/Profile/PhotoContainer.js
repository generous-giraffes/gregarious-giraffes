import React, {Component} from 'react';
import { Row, Col, Grid, Thumbnail, Button, ResponsiveEmbed } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitUserImage, getUserImages } from '../../actions/image';
import UserImageUpload from './UserImageUploadContainer'

class Photos extends Component {
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
                <Row className="userPhotos">
                    {this.props.images.map((image) => (
                      <Col xs={12} md={6}>
                          <Thumbnail className="photoThumbnail" src={image.image}>
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
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        images: state.reducers.image.UserImages
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitUserImage, getUserImages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
