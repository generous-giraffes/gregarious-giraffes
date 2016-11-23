import React from 'react';
import io from 'socket.io-client';
import { Col, Row, Grid } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveChat, getChats } from '../../actions/chat';
import ChatList from '../../components/ChatList';
import CommentForm from '../../components/CommentForm';

class ChatBox extends React.Component {
  constructor(){
      super();
      this.state = {data :[]};
  }

  componentWillMount() {
    // when mounted we'll get all previous chats to persist and render
    this.props.getChats();
  }

  componentDidMount() {
      //replace localhost with the above version for deployment
      this.socket = io('ec2-35-161-238-190.us-west-2.compute.amazonaws.com');
      //this.socket = io('http://localhost:8080');
      this.socket.on('connect', this.connect);
      // on Mount we connect to socket.io server to access chatlist
      this.socket.on('chatlist', this.updateChatList);
  }

  connect() {
      console.log("connected");
  }

  updateChatList(payload){
      this.setState({
          data : payload
      });
  }

  handleChatSubmit(comment) {
      var comments = this.state.data;
      console.log("data executed");

      comment.id = Date.now();
      var newComments = comments.concat([comment]);
      this.setState({
          data: newComments
      });

      this.props.saveChat({
        user: this.props.user,
        comment: comment
      });
      // this is where socket.io broadcasts the chat messages the user sends to server
      this.socket.emit("chatlist", newComments);
  }

  render() {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <div className="chat-box">
                <ChatList data={this.state.data} comments={this.props.comments} user={this.props.user}/>
                <CommentForm onChatSubmit={(comment) => this.handleChatSubmit(comment)} />
              </div>
            </Col>
          </Row>
        </Grid>
      );
  }
}


function mapStateToProps(state) {
  return {
    user: state.reducers.isAuthorized,
    comments: state.reducers.chat.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveChat, getChats}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
