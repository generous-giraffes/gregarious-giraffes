import React, { Component } from 'react';
import { Button, Col, Row, Grid, ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBdays } from '../../../actions/feed';

class Birthdays extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //month from new Date is zero based so add one
    let month = new Date().getMonth() + 1;
    this.props.getBdays(month);
  }

  render() {
    return (
      <div className="birthdayFeed">
          <h1 className="section_title">This Month's Birthdays</h1>
          {this.props.birthdays.map((user) => (
              <div className="card card-inverse card-info text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          {/*<img type="image" src={user.image} alt="user profile image" style={{width: '100%'}}/> */}
                              <div>{user.name}'s birthday is {user.prettyDob}</div>
                      </blockquote>
                  </div>
              </div>

          ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    birthdays: state.reducers.feedReducer.birthdays
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBdays}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Birthdays)
