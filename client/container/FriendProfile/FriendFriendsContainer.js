import React, {Component} from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFriendFriends } from '../../actions/friends';

class FriendFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false
        }
    }

    componentDidMount() {
        this.props.getFriendFriends(this.props.friendId);
    }

    render() {
        return (
                <div className="friends-div">
                    <Button className="friends-btn" bsStyle="primary" onClick={()=> this.setState({ open: !this.state.open })}>
                        {this.props.friendName}'s Friends
                    </Button>
                    <Panel collapsible expanded={this.state.open}>
                        {this.props.friendFriends.map((friend)=>
                          <Panel header={friend.name} className="Friend-Panel">
                          {/* can add more info from survey here if desired */}
                              <p>Quote: <span>{friend.quote}</span></p>
                              <p>Email: <a href={'mailto:'+ friend.email}>{friend.email}</a></p>
                          </Panel>
                        )}
                    </Panel>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        friendId: state.reducers.friends.currentFriend.id,
        friendName: state.reducers.friends.currentFriend.name,
        friendFriends: state.reducers.friends.currentFriendFriends
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getFriendFriends}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendFriends);
