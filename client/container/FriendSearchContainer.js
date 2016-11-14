import React, { Component } from 'react';
import { Popover, OverlayTrigger, Modal, ButtonGroup, DropdownButton, MenuItem, Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signinUser } from '../actions/auth';
import axios from 'axios';

//FriendSearch renders a dropdown menu and a button that loads 10 users with the option to load the next ten
//if the next ten exceed the number of users in the db then the users being fetched starts from the beginning
//when a user clicks on a user they have the option of viewing their profile or friending them
class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //commented out code is for the search bar, I decided to use a drop down menu at least for now
      // searchFor: '',
      offset: 0,
      users: [],
      max: 0,
      open: false,
      selectedUser: {}
}
  }
  //get the intial ten users for the dropdown menu and get the total number of users in the db
  componentDidMount() {
    this.loadUsers();
    this.getMax();
  }
  getMax() {
    console.log('getting max');
    axios.get('/api/users/count')
      .then((res) => {
        console.log(res.data, 'response data');
        let count = res.data[0]["count(`name`)"];
        this.setState({max: count});
      })
      .catch((err) => console.log(err))

  }
  // searchFriends(e) {
  //   let name = this.state.searchFor;
  //   console.log('searching for', name)
  //   //axios
  // }
  // changeFriend(e) {
  //   this.setState({ searchFor: e.currentTarget.value })
  // }
  friendOrViewProfile(e) {
      let email = e.currentTarget.getAttribute('data-email');
      let name = e.currentTarget.getAttribute('data-name');
      let image = e.currentTarget.getAttribute('data-image');
      this.setState({
        selectedUser:{email: email, name: name, image: image},
        open: true
      })
  }
  loadUsers() {
    let offset = this.state.offset > this.state.max ? 0 : this.state.offset;
    axios.post('/api/users', {offset : offset})
    .then((res) => {
      let nextOffset = offset + 10;
      let users = res.data;
      this.setState({users: users, offset: nextOffset});
    })
    .catch((err) => console.log(err))
  }

  friend() {
    //create server route that adds the two users to the friends table
    let email1 = this.state.selectedUser.email;
    let email2 = this.props.email;
    console.log(email1, email2, 'email 1 and 2');
    axios.post('/api/users/friend', {email1: email1 , email2: email2})
      .then((res) => {
        console.log(res, 'friended success');
      })
      .catch((err) => console.log(err))
  }

  viewProfile() {
    //make a component to render a different user's profile
    // browserHistory.push('/userProfile')
  }

  close() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }

    render() {
      const popover = (
        <Popover id="modal-popover" title="ProfilePic">
        <img src={this.state.selectedUser.image} />
        </Popover>
      );
        return (
            <div className="FriendSearch">
            <Modal show={this.state.open} onHide={() => {this.close()}}>
                <Modal.Header closeButton>
                    <Modal.Title>What would you like to do?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Username:</h4><p><OverlayTrigger overlay={popover}><a href="#">{this.state.selectedUser.name}</a></OverlayTrigger></p>
                    <h4>Email:</h4><p>{this.state.selectedUser.email }</p>
                </Modal.Body>
                <Modal.Footer>
                  <h5>Keep on Smiling!</h5>
                  <Button onClick={() => {this.close()}}>Close</Button>
                  <Button onClick={() => {this.viewProfile()}}>View Profile</Button>
                  <Button onClick={() => {this.friend()}}>Friend</Button>
               </Modal.Footer>
            </Modal>
            <ButtonGroup>
            <Button onClick={() => this.loadUsers()}>Load More Users</Button>
            <DropdownButton title="Dropdown" id="bg-nested-dropdown">
                {this.state.users.map((user, i)=> (
                  <MenuItem onClick={(e) => {this.friendOrViewProfile(e)}}
                      data-email={user.email}
                      data-name={user.name}
                      data-image={user.image}
                      eventKey={i}  >
                      name: {user.name}, email: {user.email}
                  </MenuItem>
                ))}
            </DropdownButton>
            </ButtonGroup>
                {/* <FormGroup>
                    <FormControl
                    type="text"
                    placeholder="Search for a PlayMate"
                    value={this.state.searchFor}
                    onChange={(e) => {this.changeFriend(e)}}/>
                </FormGroup>
                {' '}
                <Button type="submit" onClick={(e) => {this.searchFriends(e)}}>Submit</Button> */}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.reducers.isAuthorized,
        email: state.reducers.isAuthorized.email
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signinUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
