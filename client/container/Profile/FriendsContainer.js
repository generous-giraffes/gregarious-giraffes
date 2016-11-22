import React, { Component } from 'react';
import { Panel, Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getFriends, setCurrentFriend } from '../../actions/friends';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open2: false,
        isButtonDisabled: false,
        called: false
    }
    this.goBack = this.goBack.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }

  getFriends() {
    let id = this.props.id
    this.props.getFriends(id)
      // .then(() => console.log('Got Friends'))
      .catch((err) => console.log(err));
  }

  viewProfile() {
    //dispatch an action that sets the state
    //make a component to render a different user's profile
    browserHistory.push('/friendProfile')
  }

  goBack() {
    browserHistory.goBack()
  }

  close() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }

  viewProfile(e) {
      let index = e.currentTarget.getAttribute('data-index')
      let selectedUser = this.props.friends[index];
      this.props.setCurrentFriend(selectedUser);
      browserHistory.push('/friendProfile')
  }


    render() {
      if(this.props.newFriend.name && this.state.called === false) {
        toastr.info('You have a new friend!', `You are now friends with ${this.props.newFriend.name}`);
        this.setState({called:true});
      }
      return(
        <div className="friends-div">

            <Button className="friends-btn" bsStyle="primary" onClick={()=> this.setState({ open2: !this.state.open2 })}>
                Your Friends
            </Button>
            <Panel collapsible expanded={this.state.open2}>
                {this.props.friends.map((friend, i)=>
                  <Panel header={friend.name} bsStyle="primary">
                      <p>Quote: {friend.quote}</p>
                  <Button bsStyle="primary" data-index={i}  onClick={this.viewProfile}>View Profile</Button>
                  </Panel>
                )}
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
    friends: state.reducers.friends.allFriends,
    newFriend: state.reducers.friends.newFriends
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getFriends, setCurrentFriend}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
