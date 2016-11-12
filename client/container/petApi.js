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
