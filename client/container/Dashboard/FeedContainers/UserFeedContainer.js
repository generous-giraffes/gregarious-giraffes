import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRecentUsers } from '../../../actions/feed';


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
                {this.props.recentUsers.map((e) => (
                <div className="card card-inverse card-primary text-center">
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                            <Grid>
                                <Row className="myCard">
                                    <Col xs={12} md={4}>
                                        <img src={e.image}/>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <h5>Name: {e.name}</h5>
                                        <h6>Species: {e.species}</h6>
                                        <h6>Hobbies: {e.hobbies}</h6>
                                        <footer>Quote:
                                            <cite title="Source Title"> {e.quote}</cite>
                                        </footer>
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
