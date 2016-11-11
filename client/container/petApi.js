import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class PetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pet: '',
          image: '',
          facts: '',
          search: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      this.onSubmit()
    }
    onSubmit() {
      console.log('SUBMITTED');
      //possible animals: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
      axios.post('/api/pets', { animal: 'cat', location: '10012' })
        .then((res) => {
          console.log( res, 'response from pet API')
          let pet = res.data.petfinder.pet;
          let age = pet.age['$t'] || 'No Age';
          let animal = pet.animal['$t'] || 'Animal';
          let breed = pet.breeds.breed['$t'] || pet.breeds.breed[0]['$t'] || 'Unknown Breed';
          let email = pet.contact.email['$t'] || pet.contact.email[0]['$t'] || 'email unavailable';
          let description = pet.description['$t'] || 'no description';
          // photos is array of objects with href at ['$t']
          let photos = pet.media.photos.photo || 'no photos';
          let name = pet.name['$t'] || 'You can name it!';
          let sex = pet.sex['$t'] || 'unknown';
          // this.setState({
          //   pet: res.,
          //   image: res.,
          //   facts: res.
          // });
        })
        .catch((err) => console.error(err))

      axios.get('/api/pets/news')
        .then((res) => {
          console.log( res, 'response from petnews API')
          // this.setState({
          //   pet: res.,
          //   image: res.,
          //   facts: res.
          //
          // });
        })
        .catch((err) => console.error(err))
    }

    onChange(e) {
      // this.setState({
      //   search: e.currentTarget.value
      // })
    }

    render() {
        return (
            <div>
                <h1>Pet News</h1>
                <h2>Pet of the Day</h2>
                {/* make these cards */}
            </div>
        );
    }
}

export default PetSearch;
