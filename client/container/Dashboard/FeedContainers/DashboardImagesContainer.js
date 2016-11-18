import React, {Component} from 'react';
import { Modal, Row, Col, Grid, Thumbnail, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDashboardImages, commentOnDashImage } from '../../../actions/feed';
import { toastr } from 'react-redux-toastr';

class DashboardImagesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          comment: ''
        }
    }

    componentDidMount() {
        this.props.getDashboardImages();
        console.log('getDashboardImagesuser images submitted');
    }

    handleCommentSubmit() {
      let id = this.props.id;
      let comment = this.state.comment;
      console.log(id, commment, 'id and comment in handle comment dashboardimagescontainer');
      this.props.commentOnDashImage(id, comment);
    }

    handleCommentChange(e) {
      console.log(e.currentTarget.value, 'comment value');
      this.setState({comment: e.currentTarget.value});
    }


    render() {
        return (
            <Grid className="photos">
                <Modal show={this.state.open} onHide={() => {this.close()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment on this Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="commentInput" type="text" onChange={(e)=>this.handleCommentChange(e)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {this.close()}}>Close</Button>
                        <Button onClick={() => {
                          this.handleCommentSubmit();
                          toastr.success('Comment Success!', `You commented ${this.state.comment}`);
                          setTimeout(() => {this.close()}, 2500)
                        }}>Click to Comment</Button>
                   </Modal.Footer>
                </Modal>
                <Row>
                {this.props.dashImages.map((image) => (
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
        dashImages: state.reducers.feedReducer.dashImages
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getDashboardImages, commentOnDashImage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardImagesContainer);
