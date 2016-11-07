import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SignInForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
            this.context.router.push('/');
        }

        if (nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
            alert(nextProps.user.error.message);
        }
    }

    render() {
        const {asyncValidating, fields: {username, password}, handleSubmit, submitting, user } = this.props;

        return (
            <div className="container">
                <form onSubmit={handleSubmit(this.props.signInUser.bind(this))}>

                    <div className={`form-group ${username.touched && username.invalid ? 'has-error' : ''}`}>
                        <label className="control-label">@username*</label>
                        <input placeholder="@raja" type="text" className="form-control" {...username} />
                        <div className="help-block">
                            {username.touched ? username.error : ''}
                        </div>
                        <div className="help-block">
                            {asyncValidating === 'username' ? 'validating..' : ''}
                        </div>
                    </div>


                    <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                        <label className="control-label">Password*</label>
                        <input type="password" className="form-control" {...password} />
                        <div className="help-block">
                            {password.touched ? password.error : ''}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
                    <Link to="/" className="btn btn-error">Cancel</Link>
                </form>

            </div>

        );
    }
}

export default SignInForm;
