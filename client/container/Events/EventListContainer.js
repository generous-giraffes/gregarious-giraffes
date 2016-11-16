import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getEvent } from '../../actions/eventForm';
import { connect } from 'react-redux';
import axios from 'axios';



class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attending: []
        }
    }

    componentDidMount() {
        this.props.getEvent();
    }


    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "props++++++state for EVENT LIST", nextState);
    }

    render() {
        let $data = null;

        if (this.props.event) {
            let eventList = this.props.event;
            $data = (
                <div className="eventList">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                    {
                                        eventList.map(function(e, i) {
                                            return (
                                                <div className="demo-card">
                                                    <div className="card card-inverse card-primary text-center">
                                                        <div className="card-block">
                                                            <blockquote className="card-blockquote">
                                                                <h2>{e.name}</h2>
                                                                <h4>Location: {e.location}</h4>
                                                                <h4>Time: {e.time}</h4>
                                                                <h4>Date: {e.date}</h4>
                                                                <p>Food Options? {e.eating}</p>
                                                                <p>Any Danger? {e.danger}</p>
                                                                <p>Animals in Attendance: {e.animals}</p>
                                                                <Button className="events-btn" bsStyle="success">
                                                                    Attend Event
                                                                </Button>
                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        } else {
            $data = (<div>Please GET SOME PROPS</div>);
        }
        return (
            <div className="eventList">
                <h3>List of Events</h3>
                {$data}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        event: state.reducers.eventForm.events
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
