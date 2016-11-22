import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';
import { browserHistory } from 'react-router';

//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.onNameCreate = this.onNameCreate.bind(this);
        this.onEmailCreate = this.onEmailCreate.bind(this);
        this.onPasswordCreate = this.onPasswordCreate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //user creating their name to create a new user
    onNameCreate(event) {
        this.setState({name: event.target.value});
    }

    //user creating their email to create a new user
    onEmailCreate(event) {
        this.setState({email: event.target.value});
    }

    //user creating their password to create a new user
    onPasswordCreate(event) {
        this.setState({password: event.target.value});
    }

    //user submitting their form to create a new user
    onFormSubmit(event) {
        event.preventDefault();
        //need this from signUpUser or won't have the data
        this.props.signupUser(this.state.name, this.state.email, this.state.password)
          .then(() => browserHistory.push('/survey'));
        this.setState({
            name: '',
            email: '',
            password: ''
        });
        //moved browserHistory.push into promise so that the user becomes authenticated before the view is changed
        // browserHistory.push('/survey');
    }

    render() {

        return (
            <div className="login">
                <form onSubmit={this.onFormSubmit}>
                    <h1>Welcome to PawPrint</h1>
                    <h4>Where the animals are always the first to know...</h4>
                    <FieldGroup
                        type='text'
                        label='Name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.onNameCreate}/>
                    <FieldGroup
                        type='email'
                        label='Email Address'
                        placeholder='Email Address'
                        value={this.state.email}
                        onChange={this.onEmailCreate}/>
                    <FieldGroup
                        type='password'
                        label='Password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.onPasswordCreate}/>
                    <Button className="myButton" bsStyle="primary" type="submit" value="Submit">Enter</Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signupUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignupForm);
