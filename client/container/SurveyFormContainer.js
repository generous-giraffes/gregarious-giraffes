import React from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitForm } from '../actions/form';
import { browserHistory } from 'react-router';
import axios from 'axios';

//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

//the Form component renders the survey form and sends the responses on submit as a json object to '/survey'
class SurveyForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        dob: '',
        bloodType: '',
        season: '',
        trained: '',
        //value supplied to <select> must be an array
        hobbies: [],
        //hobbies to submit to db
        hobbiesString: '',
        species: '',
        quote: ''
      }
      //pre-bind functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDobChange = this.onDobChange.bind(this);
      this.onBloodTypeChange = this.onBloodTypeChange.bind(this);
      this.onSeasonChange = this.onSeasonChange.bind(this);
      this.onTrainedChange = this.onTrainedChange.bind(this);
      this.onHobbiesChange = this.onHobbiesChange.bind(this);
      this.onSpeciesChange = this.onSpeciesChange.bind(this);
      this.onQuoteChange = this.onQuoteChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    //submit action with all form data
    this.props.submitForm({
      dob: this.state.dob,
      bloodType: this.state.bloodType,
      season: this.state.season,
      trained: this.state.trained,
      hobbies: this.state.hobbiesString,
      species: this.state.species,
      quote: this.state.quote,
      //hardcoding userId for testing---REFACTOR-------
      userId: '1'
    });
    console.log('SUBMITTED FORM, SurveyFormContainer line 65');
    //redirect to imageUpload view
    browserHistory.push('/imageUploader');
  }

  onDobChange(e) {
    this.setState({dob:e.currentTarget.value});
  }

  onBloodTypeChange(e) {
    this.setState({bloodType:e.currentTarget.value});
  }

  onSeasonChange(e) {
    this.setState({season:e.currentTarget.value});
  }

  onTrainedChange(e) {
    this.setState({trained:e.currentTarget.value});
  }

  onHobbiesChange(e) {
    let options = e.target.options;
    let values = [];
    for(let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    let hobbiesString = values.join(', ');
    this.setState({hobbies: values, hobbiesString: hobbiesString});
  }

  onSpeciesChange(e) {
    this.setState({species: e.currentTarget.value});
  }

  onQuoteChange(e) {
    this.setState({quote:e.currentTarget.value});
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} data-toggle='validator'>

        <FieldGroup
          id="formControlsDob"
          type="date"
          label="date of birth"
          required='true'
          value={this.state.dob}
          onChange={this.onDobChange}
        />

        <FormGroup
          controlId="formControlsSelect" >
          <ControlLabel>Select Blood Type</ControlLabel>
          <select value={this.state.bloodType} onChange={this.onBloodTypeChange} className='selectpicker' title="warm or cold?" data-max-options="1" required='true'>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" >
          <ControlLabel>Select Favorite Season</ControlLabel>
          <select value={this.state.season} onChange={this.onSeasonChange} className='selectpicker season' title="favorite season" data-max-options="1" required='true'>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" >
          <ControlLabel>Are you House Trained?</ControlLabel>
          <select value={this.state.trained} onChange={this.onTrainedChange} className='selectpicker' title="yes or no" data-max-options="1" required='true'>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelectMultiple" >
          <ControlLabel>Select Four Favorite Hobbies</ControlLabel>
          <select value={this.state.hobbies} onChange={this.onHobbiesChange} className='selectpicker' multiple title="hobbies" data-max-options="4" required='true'>
            <option value="run">Running</option>
            <option value="fly">Fyling</option>
            <option value="nap">Napping</option>
            <option value="swim">Swimming</option>
            <option value="sun">Sun Bathing</option>
            <option value="eat">Eating</option>
            <option value="play">Playing</option>
            <option value="presents">Presents</option>
            <option value="learn">Tricks</option>
            <option value="fetch">Fetching</option>
            <option value="break">Breaking Rules</option>
            <option value="tv">Television</option>
            <option value="read">Reading</option>
            <option value="code">Coding</option>
            <option value="music">Music</option>
            <option value="steal">Stealing-Socks</option>
            <option value="mark">Marking-Territory</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelectMultiple" >
          <ControlLabel>Select your Species</ControlLabel>
          <select value={this.state.species} onChange={this.onSpeciesChange} className='selectpicker' title="search or select" data-max-options="1" data-live-search="true" required='true'>
            <option value="giraffe">Giraffe, Giraffa camelopardalis</option>
            <option value="dog">Dog, Canis lupus familiaris</option>
            <option value="cat">Cat, Felis silvestris catus</option>
            <option value="sheep">Sheep, Ovis aries</option>
            <option value="pig">Pig, Sus scrofa domesticus</option>
            <option value="goat">Goat, Capra aegagrus hircus</option>
            <option value="cow">Cow, Bos taurus</option>
            <option value="chicken">Chicken, Gallus gallus domesticus</option>
            <option value="duck">Duck, Anas platyrhynchos domesticus</option>
            <option value="horse">Horse, Equus ferus caballus</option>
            <option value="goldfish">Goldfish, Carassius auratus auratus</option>
            <option value="koi">Koi, Cyprinus carpio haematopterus</option>
            <option value="hedgehog">Hedgehog, Atelerix albiventris</option>
            <option value="camel">Camel, Camelus dromedarius</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea" >
          <ControlLabel>Enter your favorite quote</ControlLabel>
          <FormControl value={this.state.quote} onChange={this.onQuoteChange} componentClass="textarea" placeholder="'Nature teaches beasts to know their friends.'
          -William Shakespeare" required='true' />
        </FormGroup>

        <Button type="submit">
          Submit
        </Button>

      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitForm}, dispatch);
}

export default connect(null, mapDispatchToProps)(SurveyForm);
