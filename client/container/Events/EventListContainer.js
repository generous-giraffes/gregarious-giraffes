import React from 'react';
import { OverlayTrigger, Popover, Button, Col, Row, Grid, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getEvent, attendEvent, searchEventsByUserName, searchEventsByEventName, showEvent } from '../../actions/eventForm';
import { connect } from 'react-redux';
import axios from 'axios';
import SimpleMapPage from '../Features/MapContainer';
import { toastr } from 'react-redux-toastr';



class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            eventName: '',
            userName: '',
            search: false
        }
    }

    componentDidMount() {
        this.props.getEvent();
        this.props.userEvents.length || this.props.showEvent(this.props.id);
    }

    attend(e) {
        let user_id = this.props.id;
        let event_id = e.currentTarget.getAttribute('data-eventID');

        if(this.props.userEvents.filter((event) => event.event_id === event_id)) {
          toastr.warning('Uh Oh!', 'you are already attending this event.')
          return null;
        }
        this.props.attendEvent(event_id, user_id)
            .catch((err) => console.log(err));
        toastr.success('Event Success!', `You added the event`);
    }



    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "props++++++state for EVENT LIST", nextState);
    }

    handleUserNameChange(e) {
      if(Boolean(e.currentTarget.value)) {
        this.props.searchEventsByUserName(e.currentTarget.value);
        this.setState({search: true})
      } else
      this.setState({search: false})
    }

    handleEventNameChange(e) {
      if(Boolean(e.currentTarget.value)) {
        this.props.searchEventsByEventName(e.currentTarget.value);
        this.setState({search: true})
      } else
      this.setState({search: false})
    }

    render() {
        let defaultEvents = null;

        if (this.props.event) {
            let eventList = this.props.event;
            console.log(this.attend, 'this.attend');
            defaultEvents = (
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
                                                                <h4>{e.name}</h4>
                                                                <h4>Location: {e.location}</h4>
                                                                <p>
                                                                    <OverlayTrigger trigger="click" overlay={
                                                                            <Popover id="modal-popover" title="map">
                                                                                <div><SimpleMapPage place={e.coordinates} address={e.address} name={e.location}/></div>
                                                                            </Popover>}>
                                                                        <a style={{'color':'white'}} href="#">{e.address} <span style={{'fontSize': '10px'}}>click to view on map</span></a>
                                                                    </OverlayTrigger>
                                                                </p>
                                                                <p>Time: {e.time}</p>
                                                                <p>Date: {e.date}</p>
                                                                <p>Food Options? {e.eating}</p>
                                                                <p>Any Danger? {e.danger}</p>
                                                                <p>Animals in Attendance: {e.animals}</p>
                                                                <Button
                                                                    className="events-btn"
                                                                    bsStyle="success"
                                                                    onClick={(e) => {this.attend(e)}}
                                                                    data-eventID={e.id}
                                                                    data-index={i}>
                                                                    Attend Event
                                                                </Button>

                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }, this)
                                    }
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        } else {
            defaultEvents = (<div>There are no events, fill out the form to create one!</div>);
        }

        let eventsFromSearch = this.props.searchedEvents.map((e, i) => {
          return(

          <div className="demo-card">
                <div className="card card-inverse card-info text-center">
                    <div className="card-block">
                        <blockquote className="card-blockquote">
                            <h4>{e.name}</h4>
                            <h4>Location: {e.location}</h4>
                            <p>
                                <OverlayTrigger trigger="click" overlay={
                                        <Popover id="modal-popover" title="map">
                                            <div><SimpleMapPage place={e.coordinates} address={e.address} name={e.location}/></div>
                                        </Popover>}>
                                    <a style={{'color':'white'}} href="#">{e.address} <span style={{'fontSize': '10px'}}>click to view on map</span></a>
                                </OverlayTrigger>
                            </p>
                            <p>Time: {e.time}</p>
                            <p>Date: {e.date}</p>
                            <p>Food Options? {e.eating}</p>
                            <p>Any Danger? {e.danger}</p>
                            <p>Animals in Attendance: {e.animals}</p>
                            <Button
                                className="events-btn"
                                bsStyle="success"
                                onClick={(e) => {this.attend(e)}}
                                data-eventID={e.id}
                                data-index={i}>
                                Attend Event
                            </Button>

                        </blockquote>
                    </div>
                </div>
            </div>
          )
        }, this) || null;
        return (
            <div className="eventList">
                <h1 className="section_title">List of Events</h1>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Search by the name of the event</ControlLabel>
                    <FormControl
                      onChange={(e) => {this.handleEventNameChange(e)}}
                      componentClass="input"
                      placeholder="Event Name"
                      required='true'/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Search by who is attending the event</ControlLabel>
                    <FormControl
                       onChange={(e) => {this.handleUserNameChange(e)}}
                       componentClass="input"
                       placeholder="Event Name"
                       required='true'/>
                </FormGroup>

                {this.state.search ? eventsFromSearch : defaultEvents}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        event: state.reducers.eventForm.events,
        searchedEvents: state.reducers.eventForm.searchedEvents,
        userEvents: state.reducers.eventForm.userEvents
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getEvent, attendEvent, searchEventsByUserName, searchEventsByEventName, showEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
