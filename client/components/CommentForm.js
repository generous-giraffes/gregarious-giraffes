import React from 'react';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class CommentForm extends React.Component {
    constructor(){
        super();
        this.state = { text : '' }
    }

    handleTextChange(e) {
          this.setState({text : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        let text = this.state.text.trim();
        if (!text) {
            return;
        }
        this.props.onChatSubmit({
            text: text
        });
        this.setState({
            text: ''
        });
    }

    render() {
        return (
          <form className='chat-form' onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup controlId="formBasicText" >
              <FormControl type="text" placeholder="Enter message here..." value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
            </FormGroup>
            <Button type="submit" className="btn btn-primary">Send</Button>
          </form>
        );
    }
}

export default CommentForm