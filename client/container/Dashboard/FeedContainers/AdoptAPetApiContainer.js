import React, { Component } from 'react';
import { Button, Col, Row, Grid, Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPet } from '../../../actions/getPets';
import axios from 'axios';

//This is the smart container that hits the Pet Finder API and renders the pet of the day
class PetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.pet ? null : this.props.getPet();;
    }


    // called before the render method and enables to define if a re-rendering is needed or can be skipped
    shouldComponentUpdate(nextProps, nextState) {
        // return a boolean value
        return true;
    }

    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "props++++++state", nextState);
    }

    render() {
        //MOVE THIS INTO A LIFECYCLE METHOD --> probs componentDidRecieveProps or componentWillUpdate
        let $data = null;
        if (this.props.pet) {
            let pet = this.props.pet;
            let first = pet.photos.filter((p) => p['@size'] === 'x');
            console.log(first, 'this is first!!!!!');
            let image = (<img src={first[0]['$t']}/>);

            // this is to take user directly to the pet's detailed page if a pet id exists when the More Info button is clicked
            const url = pet.id ? `https://www.petfinder.com/petdetail/${pet.id}` : 'https://www.petfinder.com/';

            $data = (
              <div className="petOfDay">
                  <h1 className="section_title">Pet Of The Day</h1>
                  <Thumbnail>
                      { image }
                      {/* Added ellipsis and crop styling to the petOfDay description from _feed.scss */}
                      <p className="description">{pet.description}</p>
                      <p>
                          <Button href={url} target='_blank' bsStyle="primary">More Information</Button>
                      </p>
                  </Thumbnail>
                  {/* apply a filter to photos to only get ones with '@size':'x' (largest) and 'pn' second largest */}
              </div>

            );
        } else {
            $data = (<div>Sorry, there is currently no pet of the day. Check back later!</div>);
        }
        return (
            <div className="petOfDay">
                {$data}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pet: state.reducers.getPets.adoptPetData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPet}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PetSearch);
