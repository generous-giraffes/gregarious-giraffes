import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      friends: []
    }
    this.goBack = this.goBack.bind(this);
    this.getFriends = this.getFriends.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }
  getFriends() {
    console.log('get friends called id', this.props.id);
    console.log('get friends called id', this.props.id);
    let id = this.props.id
    axios.post('/api/users/friends', {id: id})
      .then((res) => {
        console.log('response friends', res);
        let friends = res.data;
        this.setState({friends: friends})
        console.log('state set', this.state);
      })
      .catch((err) => console.log(err));
  }

  goBack() {
    browserHistory.push('/imageUploader');
  }


    render() {
      return(
        <div className="friends-div">
            <Button className="friends-btn" bsStyle="primary" onClick={()=> this.setState({ open2: !this.state.open2 })}>
                Your Friends
            </Button>
            <Panel collapsible expanded={this.state.open2}>
                <Panel header="Benny" bsStyle="primary">
                  Benny likes to sleep and mess up the sofa
                </Panel>
                <Panel header="Margaret Thatcher" bsStyle="primary">
                  Margaret likes to be a classic dog
                </Panel>
                {this.state.friends.map((friend)=>
                  <Panel header={friend.name} bsStyle="primary">
                  <p>{friend.quote}</p>
                  <Button bsStyle="primary" onClick={()=>{browserHistory.push('/friendProfile')}}></Button>
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
    id: state.reducers.isAuthorized.id
   }
}

export default connect(mapStateToProps)(Friends);
