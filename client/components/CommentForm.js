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

        var text = this.state.text.trim();
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

              <ControlLabel>Enter message</ControlLabel>
              <FormControl type="text" value={this.state.text} onChange={(e) => this.handleTextChange(e)} />
            </FormGroup>
            <Button type="submit">Send</Button>
          </form>
        );
    }
}

export default CommentForm