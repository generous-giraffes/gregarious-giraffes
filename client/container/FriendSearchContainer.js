import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signinUser } from '../actions/auth';


class FriendSearch extends Component {


    render() {
        return (
            <div className="FriendSearch">
                <FormGroup>
                    <FormControl type="text" placeholder="Search for a PlayMate"/>
                </FormGroup>
                {' '}
                <Button type="submit">Submit</Button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.reducers.isAuthorized
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signinUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
