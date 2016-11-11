import React from 'react';
import io from 'socket.io-client';

class MainChat extends React.Component {
  render() {
      return (
          <div>
          <ChatBox />
      </div>
      );
  }
}

class ChatBox extends React.Component {
  constructor(){
      super();
      this.state = {data :[]};
      this.updateChatList = this.updateChatList.bind(this);
  }

  componentWillMount() {
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
          <CommentForm  onChatSubmit={this.handleChatSubmit.bind(this)} />
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
        <div className="chatList">
          <h3>Chat Room</h3>
          {commentNodes}
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
          <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
           <input type="text" placeholder="Enter name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)} />
           <input type="text" placeholder="Type here..." value={this.state.text} onChange={this.handleTextChange.bind(this)} />
           <input type="submit" value="Send" />
          </form>
        );
    }
}

export default MainChat
