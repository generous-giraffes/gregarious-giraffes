import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRecentUsers } from '../../../actions/feed';

//Smart container showing the most recent users that have joined the app
class UserFeed extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRecentUsers();
    }

    render() {
        return (
            <div className="userFeed">
                <h1 className="section_title">Recent Users</h1>
                {this.props.recentUsers.map((e) => (
                <div className="card card-inverse card-primary text-center">
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                            <Grid>
                                <Row className="myCard">
                                    <Col xs={12} md={4}>
                                        <div className="img-container">
                                            <img src={e.image}/>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <p className="title">{e.name}</p>
                                        <p className="detail">Species: {e.species}</p>
                                        <p className="detail">Hobbies: {e.hobbies}</p>
                                    </Col>
                                </Row>
                            </Grid>
                        </blockquote>
                    </div>
                </div>
                ))}
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        recentUsers: state.reducers.feedReducer.recentUsers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getRecentUsers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed);
