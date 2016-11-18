import React, {Component} from 'react';
import { Row, Col, Grid, Thumbnail, Button } from 'react-bootstrap';
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
                <Row>
                {this.props.images.map((image) => (
                  <Col xs={12} md={6}>
                      <Thumbnail src={image.image}>
                          <h3>{image.caption}</h3>
                          <p>
                              <Button bsStyle="primary">Like</Button>&nbsp;
                              <Button bsStyle="default">Comment</Button>
                          </p>
                      </Thumbnail>
                  </Col>
                ))}
                    {/* <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col> */}
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
