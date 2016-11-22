import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/auth';
import { browserHistory } from 'react-router';

//need to include the signinuser above in order to dispatch the bindActionCreators

//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //user submitting their email to login
    onEmailSubmit(event) {
        this.setState({email: event.target.value});
    }

    //user submitting their password to login
    onPasswordSubmit(event) {
        this.setState({password: event.target.value});
    }

    //user pressing enter to submit their form including teh password and email submission
    onFormSubmit(event) {
        console.log(event, 'this is the form submit event');
        event.preventDefault();
        //need props from signInUser
        this.props.signinUser(this.state.email, this.state.password)
          .then(() => browserHistory.push('/dashboard'));
        //This is to remove the text so that it clears the placeholders in the form
        this.setState({
            email: '',
            password: ''
        });
         browserHistory.push('/dashboard');
    }

    render() {

        return (
            <div className="login">
                <form onSubmit={this.onFormSubmit}>
                    <h1>Welcome to PawPrint</h1>
                    <h4>Where the animals are always the first to know...</h4>
                    <FieldGroup
                        type='text'
                        label='Email Address'
                        placeholder='Email Address'
                        value={this.state.email}
                        onChange={this.onEmailSubmit}/>
                    <FieldGroup
                        type='password'
                        label='Password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.onPasswordSubmit}/>
                    <Button bsStyle="primary" type="submit" value="Submit">Enter</Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signinUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm);
