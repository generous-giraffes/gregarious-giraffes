import React, {Component} from 'react';
import { Row, Col, Grid, Thumbnail, Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFriendImages } from '../../actions/friends';

class FriendImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
    }

    componentDidMount() {
        this.props.getFriendImages(this.props.friendId);
    }

    render() {
        return (
            <Grid className="photos">
                <Row className="userPhotos">
                  {this.props.friendImages.map((image) => (
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
        friendId: state.reducers.friends.currentFriend.id,
        friendName: state.reducers.friends.currentFriend.name,
        friendImages: state.reducers.friends.currentFriendImages
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getFriendImages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendImages);
