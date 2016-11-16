import React, { Component } from 'react';
import { Popover, OverlayTrigger, Modal, ButtonGroup, DropdownButton, MenuItem, Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getMax, loadUsers, addFriend, setCurrentFriend } from '../../actions/friends';
import axios from 'axios';

//FriendSearch renders a dropdown menu and a button that loads 10 users with the option to load the next ten
//if the next ten exceed the number of users in the db then the users being fetched starts from the beginning
//when a user clicks on a user they have the option of viewing their profile or friending them
class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      users: [],
      max: 0,
      open: false,
      selectedUser: {}
}
  }
  //get the intial ten users for the dropdown menu and get the total number of users in the db
  componentDidMount() {
    this.props.getMax();
    this.props.loadUsers();
  }

  friendOrViewProfile(e) {
      let email = e.currentTarget.getAttribute('data-email');
      let name = e.currentTarget.getAttribute('data-name');
      let image = e.currentTarget.getAttribute('data-image');
      let index = e.currentTarget.getAttribute('data-index')
      this.setState({
        selectedUser:{email: email, name: name, image: image},
        open: true
      })
      let selectedUser = this.state.users[index];
      this.props.setCurrentFriend(selectedUser);
  }



  friend() {
    let email = this.state.selectedUser.email; //person being friended
    let id = this.props.id; //id of signed in user
    //dispatch action to add a friend
    this.props.addFriend(id, email)
      .then((data) => {
        console.log('success on adding a friend, that is if you have any ;)')
        // this.setState({})//something to do with friend success
      })
      .catch((err) => console.log(err));
  }

  viewProfile() {
    //dispatch an action that sets the state
    //make a component to render a different user's profile
    browserHistory.push('/friendProfile')
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
                    <h4>Species:</h4><p>{this.state.selectedUser.species }</p>
                    <h4>Hobbies:</h4><p>{this.state.selectedUser.hobbies }</p>
                    <h4>BooldType:</h4><p>{this.state.selectedUser.bloodType }</p>
                    <h4>Quote:</h4><p>{this.state.selectedUser.quote }</p>
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
                            data-index={i}
                            eventKey={i}  >
                            name: {user.name}, email: {user.email}
                        </MenuItem>
                    ))}
                </DropdownButton>
            </ButtonGroup>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.reducers.isAuthorized,
        email: state.reducers.isAuthorized.email,
        id: state.reducers.isAuthorized.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMax, addFriend, loadUsers, setCurrentFriend}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
