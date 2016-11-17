import React from 'react';
import { Link, browserHistory } from 'react-router';
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

    destroy() {
        this.props.logoutAndRedirect()
            .then((data) => {
                console.log('success on the redirect!!!!')
            })
            .catch((err) => console.log(err));
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
                        <Link to="/dashboard"><img src={'../styles/assets/pawprint2.png'}/></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={{ pathname: '/signin'}} className="header-login">
                            <NavItem eventKey={1}>Log In</NavItem>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: '/'}} className="header-login">
                            <NavItem eventKey={1}>Edit Profile</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={3} title="See More" id="basic-nav-dropdown" onSelect={handleSelect}>
                            <MenuItem eventKey={3.1}>Events</MenuItem>
                            <MenuItem eventKey={3.2}>My Profile</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.4}>Chat</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                            <NavItem onClick={() => this.destroy()}>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function handleSelect(eventKey) {
    if (eventKey === 3.4) {
        browserHistory.push('/chat');
    } else if (eventKey === 3.1) {
        browserHistory.push('/events');
    } else if (eventKey === 3.2) {
        browserHistory.push('/myProfile');
    }
}

function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutAndRedirect}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
