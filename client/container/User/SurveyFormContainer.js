import React from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitForm } from '../../actions/form';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Select from 'react-select';


//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

const HOBBIES = [
  {label: 'Running', value: 'Running'},
  {label: 'Sniffing', value: 'Sniffing'},
  {label: 'Flying', value: 'Flying'},
  {label: 'Napping', value: 'Napping'},
  {label: 'Singing', value: 'Singing'},
  {label: 'Hunting', value: 'Hunting'},
  {label: 'Swimming', value: 'Swimming'},
  {label: 'Destroying things', value: 'Destroying things'},
  {label: 'Snuggling', value: 'Snuggling'},
  {label: 'Eating humans', value: 'Eating humans'},
  {label: 'Making Noise', value: 'Making Noise'},
  {label: 'Marking Territory', value: 'Marking Territory'},
  {label: 'Stealing Socks', value: 'Stealing Socks'}
];

//the Form component renders the survey form and sends the responses on submit as a json object to '/survey'
class SurveyForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        dob: '',
        //default values show on dropdowns
        bloodType: 'Cold',
        season: 'spring',
        trained: 'yes',
        species: 'giraffe',
        quote: '',
        options: HOBBIES,
        value: []
      }
      //pre-bind functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDobChange = this.onDobChange.bind(this);
      this.onBloodTypeChange = this.onBloodTypeChange.bind(this);
      this.onSeasonChange = this.onSeasonChange.bind(this);
      this.onTrainedChange = this.onTrainedChange.bind(this);
      this.onSpeciesChange = this.onSpeciesChange.bind(this);
      this.onQuoteChange = this.onQuoteChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let hobbies = this.state.value.split(',').join(', ');
    //submit action with all form data
    this.props.submitForm({
      dob: this.state.dob,
      bloodType: this.state.bloodType,
      season: this.state.season,
      trained: this.state.trained,
      hobbies: hobbies,
      species: this.state.species,
      quote: this.state.quote,
      email: this.props.email
    });
    //redirect to imageUpload view
    browserHistory.push('/imageUploader');
  }

  onDobChange(e) {
    this.setState({dob:e.currentTarget.value});
  }

  handleSelectChange(value) {
    console.log('You\'ve selected:', this.state.value);
    this.setState({value});
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

  onSpeciesChange(e) {
    this.setState({species: e.currentTarget.value});
  }

  onQuoteChange(e) {
    this.setState({quote:e.currentTarget.value});
  }


  render() {
    return (
    <Grid className="survey-form">
        <Row className="show-grid">
            <Col xs={12}>
                <form onSubmit={this.handleSubmit} data-toggle='validator'>

                    <FieldGroup
                        id="formControlsDob"
                        type="date"
                        label="Date of Birth"
                        required='true'
                        value={this.state.dob}
                        onChange={this.onDobChange}
                    />

                    <FormGroup
                        controlId="formControlsSelect">
                        <ControlLabel>Select Blood Type</ControlLabel>
                        <select noValidate value={this.state.bloodType} onChange={this.onBloodTypeChange}
                                className='selectpicker' title="warm or cold?" data-max-options="1" required='true'>
                            <option value="Cold">Cold</option>
                            <option value="Warm">Warm</option>
                        </select>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select Favorite Season</ControlLabel>
                        <select noValidate value={this.state.season} onChange={this.onSeasonChange}
                                className='selectpicker season' title="favorite season" data-max-options="1"
                                required='true'>
                            <option value="spring">Spring</option>
                            <option value="summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Are you House Trained?</ControlLabel>
                        <select noValidate value={this.state.trained} onChange={this.onTrainedChange}
                                className='selectpicker' title="yes or no" data-max-options="1" required='true'>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Select multi simpleValue disabled={this.state.disabled} value={this.state.value}
                                placeholder="Select your hobbies" options={this.state.options}
                                onChange={this.handleSelectChange}/>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>Select your Species</ControlLabel>
                        <select noValidate value={this.state.species} onChange={this.onSpeciesChange}
                                className='selectpicker' title="search or select" data-max-options="1"
                                data-live-search="true" required='true'>
                            <option value="Giraffe">Giraffe, Giraffa camelopardalis</option>
                            <option value="Dog">Dog, Canis lupus familiaris</option>
                            <option value="Cat">Cat, Felis silvestris catus</option>
                            <option value="Sheep">Sheep, Ovis aries</option>
                            <option value="Pig">Pig, Sus scrofa domesticus</option>
                            <option value="Goat">Goat, Capra aegagrus hircus</option>
                            <option value="Cow">Cow, Bos taurus</option>
                            <option value="Chicken">Chicken, Gallus gallus domesticus</option>
                            <option value="Duck">Duck, Anas platyrhynchos domesticus</option>
                            <option value="Horse">Horse, Equus ferus caballus</option>
                            <option value="Goldfish">Goldfish, Carassius auratus auratus</option>
                            <option value="Koi">Koi, Cyprinus carpio haematopterus</option>
                            <option value="Hedgehog">Hedgehog, Atelerix albiventris</option>
                            <option value="Camel">Camel, Camelus dromedarius</option>
                        </select>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter your favorite quote</ControlLabel>
                        <FormControl value={this.state.quote} onChange={this.onQuoteChange} componentClass="textarea"
                                     placeholder="'Nature teaches beasts to know their friends.'
          -William Shakespeare" required='true'/>
                    </FormGroup>

                    <Button type="submit" bsStyle="primary">
                        Submit
                    </Button>

                </form>
            </Col>
        </Row>
    </Grid>

    )
  }
}

function mapStateToProps(state) {
  return { email: state.reducers.isAuthorized.email }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
