import React, { Component } from 'react';
import { Button, Col, Row, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';
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
      <div>
          <h3>This Month's Birthdays</h3>
          {this.props.birthdays.map((user) => (
            <p>{user.name}</p>
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
