import React, { Component } from 'react';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPet, getPetNews } from '../actions/getPets';
import axios from 'axios';

class PetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //  pet: []
         }

        //  store.subscribe(() => {
        //    // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
        //    this.setState({
        //      pet: store.getState().adoptPetData
        //    })
        //  })
       }

    componentDidMount() {
      this.props.getPet();
      this.props.getPetNews();
    }


    render() {
        return (
            <div>
                <h1>Pet News</h1>
                <h2>Pet of the Day</h2>
                {/* <img src={this.props.please.photos[2]['$t']} /> */}
                <div>{this.props.please.age}</div>
                {
                  this.props.please ? <div> please wait</div> :
                  <img src={this.props.please.photos[2]['$t']} />
                }

            </div>
        );
    }
}
// let unsubscribe = store.subscribe(PetSearch)

function mapStateToProps(state) {
  return {
    pet: state,
    please: state.reducers.getPets
   }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPet, getPetNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PetSearch);
