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
    
    // called before the render method and enables to define if a re-rendering is needed or can be skipped
    shouldComponentUpdate(nextProps, nextState){
      // return a boolean value
      return true;
    }
    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState){
      // perform any preparations for an upcoming update
      console.log(nextProps, "props++++++state", nextState);
    }

    render() {
      //MOVE THIS INTO A LIFECYCLE METHOD --> probs componentDidRecieveProps or componentWillUpdate
      let $data = null;
      if(this.props.pet.adoptPetData) {
        let pet = this.props.pet.adoptPetData;
          $data = (<div>
            <div>{pet.description}</div>
            {/* apply a filter to photos to only get ones with '@size':'x' (largest) and 'pn' second largest */}
            {
              pet.photos
              .filter((p) => p['@size'] === 'x' || p['@size'] === 'pn' )
              .map((p) =>
                <img src={p['$t']} />
              )
            }
          </div>
        );
        } else {
          $data = (<div>Please GET SOME PROPS</div>);
        }
        return (
            <div>
                <h2>Pet of the Day</h2>
                {$data}
                <h1>Pet News</h1>
                {}
            </div>
        );
    }
}
// let unsubscribe = store.subscribe(PetSearch)

//why are articles in adoptPetData in the state
function mapStateToProps(state) {
  return {
    pet: state.reducers.getPets
   }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPet, getPetNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PetSearch);
