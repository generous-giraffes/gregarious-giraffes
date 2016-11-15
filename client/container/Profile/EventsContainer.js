import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      return(
        <div className="events-div">
            <Button className="events-btn" bsStyle="success" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
            View Events
            </Button>
            <Panel collapsible expanded={this.state.open1}>
            <Panel header="Madison Square Park" bsStyle="success">
                <h2>Location: {this.props.location}</h2>
            </Panel>
            <Panel header="Central Park" bsStyle="success">
                There is an Event in Central  Park.
                Wednesday Novermber 20, 2016 at 9:00am
            </Panel>
            </Panel>
        </div>
      )
    }
}


function mapStateToProps(state) {
  return {
    //event info
    email: state.reducers.isAuthorized.email,
    id: state.reducers.isAuthorized.id
   }
}

export default connect(mapStateToProps)(EventInfo);
