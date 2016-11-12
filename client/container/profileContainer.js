import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="feed">
          <div className="demo-card">
              <div className="card card-inverse card-primary text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <p>hobbies: {this.props.hobbies}</p>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
              <div className="card card-inverse card-success text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <p>dob: {this.props.dob}</p>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
              <div className="card card-inverse card-info text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <p>trained: {this.props.trained}</p>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
              <div className="card card-inverse card-warning text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <p>quote: {this.props.quote}</p>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
              <div className="card card-inverse card-danger text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <p>species: {this.props.species}</p>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
              <div className="card card-inverse card-danger text-center">
                  <div className="card-block">
                      <blockquote className="card-blockquote">
                          <img src={this.props.image}/>
                          <footer>Someone famous in
                              <cite title="Source Title">Source Title</cite>
                          </footer>
                      </blockquote>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

//ADD SUBSCRIBE?
function mapStateToProps(state) {
  return {
    email: state.reducers.isAuthorized.email,
    bloodType: state.reducers.form.bloodType,
    dob: state.reducers.form.dob,
    hobbies: state.reducers.form.hobbies,
    image: state.reducers.image.image,
    quote: state.reducers.form.quote,
    season: state.reducers.form.season,
    species: state.reducers.form.species,
    trained: state.reducers.form.trained
   }
}

export default connect(mapStateToProps)(MyProfile);
