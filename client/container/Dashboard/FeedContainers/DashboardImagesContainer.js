import React, {Component} from 'react';
import { Modal, Row, Col, Grid, Thumbnail, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDashboardImages, commentOnDashImage } from '../../../actions/feed';
import { toastr } from 'react-redux-toastr';

//This smart container shows the additional images that users upload from their profiles
class DashboardImagesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          comment: '',
          user_image_id: '',
          imageId: ''
        }
    }

    //pulls the props for the Dashboard images
    componentDidMount() {
        this.props.getDashboardImages();
    }

    handleCommentSubmit() {
      let id = this.props.id;
      let comment = this.state.comment;
      let imageId = this.state.imageId;
      let user_image_id = this.state.user_image_id;
      let userName = this.props.name;
      this.props.commentOnDashImage(id, comment, imageId, user_image_id, userName);
    }

    handleCommentChange(e) {
      this.setState({comment: e.currentTarget.value});
    }

    close() {
      this.setState({ open: false });
    }

    open(e) {
      let imageId = e.currentTarget.getAttribute('data-imageId');
      let user_image_id = e.currentTarget.getAttribute('data-user_image_id');
      this.setState({ open: true, imageId, user_image_id });
    }


    render() {
      console.log(this.props.dashImages, 'dash images');
        return (
        <div className="imagesFeed">
            <h1 className="section_title">Recent Images</h1>
            <Modal show={this.state.open} onHide={() => {this.close()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Comment on this Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="commentInput" type="text"
                           onChange={(e)=>this.handleCommentChange(e)}/>
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
            {this.props.dashImages.map((image) => (
                <div className="card card-inverse card-success text-center">
                    <div className="card-block">
                        <Grid>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Thumbnail src={image.image}>
                                        <p>{image.name}: {image.caption}</p>
                                    </Thumbnail>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p className="commentary">
                                        {image.comments.map((comment)=> {
                                            return comment[0] ? (<p>{comment[0]} commented: {comment[1]}</p>) : null;
                                        })}
                                        <Button
                                            onClick={(e) => {this.open(e)}}
                                            data-imageId={image.id}
                                            data-user_image_id={image.user_image_id}
                                            bsStyle="default">
                                            Comment
                                        </Button>
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            ))}
        </div>

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
