import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showEvent } from '../../actions/eventForm';

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.showEvent(this.props.id);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log(nextProps, "Props for EVENT ON PROFILE", nextState);
    }

    render() {
      let noEvent = null;
      if(!this.props.userEvent.length) {
        noEvent = ( <Panel header='You are not currently attending any events' bsStyle="success">
                      <p>Head over to events to see what is going on</p>
                  </Panel>)
      }
      return(
        <div className="events-div">
            <Button className="events-btn" bsStyle="primary" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
            View Events
            </Button>
            <Panel collapsible expanded={this.state.open1}>
            {noEvent}
            {this.props.userEvent.map((event, i) =>
              <Panel header={event.name} bsStyle="success" className="events-panel">
                  <p>Location: {event.location}</p>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Gifts: {event.gifts}</p>
                  <p>Animals: {event.animals}</p>
                  <p>Eating: {event.eating}</p>
                  <p>Danger: {event.danger}</p>
                  <p>Address: {event.address}</p>
              </Panel>
            , this)}
            </Panel>
        </div>
      )
    }
}

function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        event: state.reducers.eventForm.events,
        userEvent: state.reducers.eventForm.userEvents
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);
