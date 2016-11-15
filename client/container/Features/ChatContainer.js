import React from 'react';
import ChatBox from '../../components/Chat';
import io from 'socket.io-client';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class ChatBox extends React.Component {
  constructor(){
      super();
      this.state = {data :[]};
      this.updateChatList = this.updateChatList.bind(this);
  }

  componentDidMount() {
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
      var comments = this.state.data;
      console.log("data executed");

      comment.id = Date.now();
      var newComments = comments.concat([comment]);
      this.setState({
          data: newComments
      });

      this.socket.emit("chatlist", newComments);
  }

  render() {
      return (
        <div className="chatBox">
          <ChatList data={this.state.data}/>
          <CommentForm onChatSubmit={(comment) => this.handleChatSubmit(comment)} />
        </div>
      );
  }
}

class ChatList extends React.Component {
  render() {
      var commentNodes = this.props.data.map((comment) => {
        return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="panel panel-default">
          <div className="page-header">
            <h1 className="text-center">Chat Room</h1>
          </div>
          <div className="chat-list">{commentNodes}</div>
        </div>
      );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div>
        <h4 className="commentAuthor">
          {this.props.author} says:
        </h4>
        <span className="comment">{this.props.children}</span>
      </div>
    );
  }
}

class CommentForm extends React.Component {
    constructor(){
        super();
        this.state = {author :'',text : ''}
    }
    handleAuthorChange(e) {
        this.setState({author : e.target.value})
    }
    handleTextChange(e) {
          this.setState({text : e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onChatSubmit({
            author: author,
            text: text
        });
        this.setState({
            author: '',
            text: ''
        });
    }

    render() {
        return (
          <form className='chat-form' onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup controlId="formBasicText" >
              <ControlLabel>Enter name</ControlLabel>
              <FormControl type="text" value={this.state.author} onChange={(e) => this.handleAuthorChange(e)} />
              <ControlLabel>Enter message</ControlLabel>
              <FormControl type="text" value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
            </FormGroup>
            <Button type="submit">Send</Button>
          </form>
        );
    }
}

export default ChatBox