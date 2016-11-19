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
    this.props.getChats();
  }

  componentDidMount() {
      //replace localhost with ec2-35-161-238-190.us-west-2.compute.amazonaws.com
      this.socket = io('http://localhost:8080');
      this.socket.on('connect', this.connect);
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
      var comments = this.state.data; // empty array at first
      console.log("data executed");

      comment.id = Date.now(); // {text: 'text' , id: 'id' }
      var newComments = comments.concat([comment]); // [{text: 'text' , id: 'id' }]
      this.setState({
          data: newComments   // {data: [{text: 'text' , id: 'id' }]}
      });

      this.props.saveChat({
        // this.props.user is the user
        user: this.props.user,
        // this is equivalent to just putting 'comment' (object shorthand)
        comment: comment
      });

      this.socket.emit("chatlist", newComments);
  }

  render() {
    // this.props.comments and this.props.user comes from the store
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <div className="chatBox">
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
    // This is the user from the store (email, id, name, etc.)
    user: state.reducers.isAuthorized,
    comments: state.reducers.chat.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveChat, getChats}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
