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
          comment: '',
          user_image_id: '',
          imageId: ''
        }
    }

    componentDidMount() {
        this.props.getDashboardImages();
        console.log('getDashboardImagesuser images submitted');
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
      console.log(e.currentTarget.value, 'comment value');
      this.setState({comment: e.currentTarget.value});
    }

    close() {
      this.setState({ open: false });
    }

    open(e) {
      let imageId = e.currentTarget.getAttribute('data-imageId');
      let user_image_id = e.currentTarget.getAttribute('data-user_image_id');
      console.log(imageId, 'image Id for submission');
      this.setState({ open: true, imageId, user_image_id });
    }


    render() {
      console.log(this.props.dashImages, 'dash images');
        return (
        <div className="photos">
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
                        <Thumbnail src={image.image}>
                            <h3>{image.name}: {image.caption}</h3>
                            {image.comments.map((comment)=> {
                                return comment[0] ? (<p>{comment[0]} commented: {comment[1]}</p>) : null;
                            })}
                            <p>
                                <Button
                                    onClick={(e) => {this.open(e)}}
                                    data-imageId={image.id}
                                    data-user_image_id={image.user_image_id}
                                    bsStyle="default">
                                    Comment
                                </Button>
                            </p>
                        </Thumbnail>
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
