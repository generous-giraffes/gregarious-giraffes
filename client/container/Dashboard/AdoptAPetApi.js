import React, { Component } from 'react';
import { Button, Col, Row, Grid, Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPet } from '../../actions/getPets';
import axios from 'axios';

class PetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getPet();
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
        if (this.props.pet.adoptPetData) {
            let pet = this.props.pet.adoptPetData;
            let first = pet.photos.filter((p) => p['@size'] === 'x');
            console.log(first, 'this is first!!!!!');
            let image = (<img src={first[0]['$t']}/>);
            var maxlength = 60;
            $('p.description').text(function (_, text) {
                return $.trim(text).substring(0, maxlength);
            });
            $data = (
                <div className="petOfDay">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Thumbnail>
                                    <h3>Pet of the Day</h3>
                                    { image }
                                    <p className="description">{pet.description}</p>
                                    <p>
                                        <Button href='https://www.petfinder.com/' target='_blank' bsStyle="primary">More Information</Button>
                                    </p>

                                </Thumbnail>

                            </Col>
                        </Row>
                    </Grid>
                    {/* apply a filter to photos to only get ones with '@size':'x' (largest) and 'pn' second largest */}
                </div>
            );
        } else {
            $data = (<div>Please GET SOME PROPS</div>);
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
        pet: state.reducers.getPets
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPet}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PetSearch);