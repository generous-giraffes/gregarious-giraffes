import React from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class ChatList extends React.Component {
    render() {
      let commentNodes = this.props.data.map((comment) => {
        return (
          <Comment user={this.props.user} key={comment.id}>
            {comment.text}
          </Comment>
        );
      });
      // this is the persisted data from the store
      let chatHistory = this.props.comments.map((comment) => {
        return (
          <Comment user={comment} key={comment.id}>
            {comment.comment}
          </Comment>
        );
      });

      return (
        <div className="panel panel-default chat-list-wrapper">
          <div className="page-header">
            <h1 className="text-center">Chat Room</h1>
          </div>
          <div className="chat-list">
            {chatHistory}
            {commentNodes}
          </div>
        </div>
      );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div>
        <h4 className="comment-author">
          {this.props.user.name} says:
        </h4>
        <div className="comment-bubble">
          <span className="comment">{this.props.children}</span>
        </div>
      </div>
    );
  }
}

export default ChatList