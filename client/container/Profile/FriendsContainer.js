import React, { Component } from 'react';
import { Panel, Button, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getFriends } from '../../actions/friends';
import axios from 'axios';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      newFriends: []
    }
    this.goBack = this.goBack.bind(this);
    this.getFriends = this.getFriends.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log( 'new', prevState);
  //   let prevLength = prevState.newFriends.length;
  //   let newFriends = this.props.friends.slice(prevLength)
  //   console.log(newFriends, 'NEW FRIENDS');
  //   this.state.newFriends = newFriends;
  // }

  componentDidMount() {
    this.getFriends();
    this.getFriends();
  }
  getFriends() {
    let id = this.props.id
    this.props.getFriends(id)
      .then(() => console.log('SUCCESS ON GETTINF FRIENDS, that is if you have any ;)'))
      .catch((err) => console.log(err));
      ///GET FRIENDS IN MAP STATE TO PROPS

    // axios.get('/api/users/friends?id=' + id)
    //   .then((res) => {
    //     console.log('response friends', res);
    //     let friends = res.data;
    //     this.setState({friends: friends})
    //     console.log('state set', this.state);
    //   })
    //   .catch((err) => console.log(err));
  }

  goBack() {
    browserHistory.push('/imageUploader');
  }
  close() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }
  close1() {
    this.setState({ open1: false });
  }

  open1() {
    this.setState({ open1: true });
  }


    render() {
      return(
        <div className="friends-div">
        <Modal show={this.state.open1} onHide={() => {this.close1()}}>
            <Modal.Header closeButton>
                <Modal.Title>New Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.newFriends ? (<h5>No New Friends, Head to the dahsboard to makes some new ones!</h5>) : null}
                {/* {this.state.newFriends.map((friend) => {
                  <div>
                  <h5>Name: {friend.name}</h5>
                  <h6>Species: {friend.species}</h6>
                  </div>
                })} */}
            </Modal.Body>
            <Modal.Footer>
            <h5>Keep on Smiling!</h5>
            <Button onClick={() => {this.close1()}}>Close</Button>
            <Button onClick={() => {this.viewProfile()}}>View Profile</Button>
            </Modal.Footer>
        </Modal>
        <Button bsStyle='info' onClick={() => this.setState({open1: !this.state.open1})}></Button>

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
                {this.props.friends.map((friend)=>
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
    id: state.reducers.isAuthorized.id,
    friends: state.reducers.friends.allFriends,
    newfriends: state.reducers.friends.newfriends
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getFriends}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
