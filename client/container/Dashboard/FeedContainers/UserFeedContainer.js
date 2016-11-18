import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getUsers } from '../../../actions/feed';


class UserFeed extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
    }


    render() {
        return (
            <div className="card-block">
                <blockquote className="card-blockquote">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                        ante.</p>
                    <footer>Someone famous in
                        <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
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
    return bindActionCreators({getUsers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);
