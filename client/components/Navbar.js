import React from 'react';
import { Router, Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, MenuItem, NavItem, NavDropdown, Image} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '../actions/auth';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.logoutAndRedirect();
    }

    logOut(event) {
        console.log(this.props.token, 'this is the TOKENNNNN')
        event.preventDefault();
        this.props.logoutAndRedirect();
        browserHistory.push('/signin');
    }

    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "NEED TO KNOW PROPS DESTROYED FOR LOGOUT", nextState);
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/dashboard"><img src={'../styles/assets/pawprint3.png'}/></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={{pathname: '/signin'}} className="header-login">
                            <NavItem eventKey={1}>Log In</NavItem>
                        </LinkContainer>
                            <LinkContainer to={{pathname: '/myProfile'}} className="header-login">
                        <NavItem eventKey={2}>My Profile</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={3} title="See More" id="basic-nav-dropdown" onSelect={handleSelect}>
                            <MenuItem eventKey={3.1}>Dashboard</MenuItem>
                            <MenuItem eventKey={3.2}>Events</MenuItem>
                            <MenuItem eventKey={3.3}>Chat</MenuItem>
                            <MenuItem eventKey={3.4}>Sign Up</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                            <NavItem onClick={(e) => this.logOut(e)}>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

//This handles all the redirects for the navbar, including all the browserHistory
function handleSelect(eventKey) {
    if (eventKey === 3.3) {
        browserHistory.push('/chat');
    } else if (eventKey === 3.2) {
        browserHistory.push('/events');
    } else if (eventKey === 3.1) {
        browserHistory.push('/dashboard');
    } else if (eventKey === 3.4) {
        browserHistory.push('/signup');
    }
}

function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        token: state.reducers.isAuthorized.token,
        isAuthenticated: state.reducers.isAuthorized.isAuthenticated
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutAndRedirect}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
