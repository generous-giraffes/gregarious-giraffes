import React, {Component} from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFriendEvents } from '../../actions/friends';

class FriendEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
    }

    componentDidMount() {
        this.props.getFriendEvents(this.props.friendId);
    }

    render() {
        return (
                <div className="events-div">
                    <Button className="events-btn" bsStyle="primary" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
                        View Events
                    </Button>
                    <Panel collapsible expanded={this.state.open1}>

                    {this.props.friendEvents.map((event, i) =>
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
        friendId: state.reducers.friends.currentFriend.id,
        friendName: state.reducers.friends.currentFriend.name,
        friendEvents: state.reducers.friends.currentFriendEvents
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getFriendEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendEvents);
