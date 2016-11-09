import React from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
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
  }

  handleSubmit(e) {
    e.preventDefault();
// Save elements from the form as variables to retrieve their values. $(e.currentTarget)[0] is the form with an array of its subcomponents
    var firstNameForm = $(e.currentTarget)[0][0];
    var lastNameForm = $(e.currentTarget)[0][1];
    var dobForm = $(e.currentTarget)[0][2];
    var bloodTypeForm = $(e.currentTarget)[0][3];
    var seasonForm = $(e.currentTarget)[0][5];
    var trainedForm = $(e.currentTarget)[0][7];
    var hobbiesForm = $(e.currentTarget)[0][9];
    var speciesForm = $(e.currentTarget)[0][11];
    var quoteForm = $(e.currentTarget)[0][14];

//get the values from the elements
    var firstName = $(firstNameForm).val();
    var lastName = $(lastNameForm).val();
    var dob = $(dobForm).val();
    var bloodType = $(bloodTypeForm).find('span').text();
    var season = $(seasonForm).find('span').text();
    var trained = $(trainedForm).find('span').text();
    var hobbies = $(hobbiesForm).find('span').text();
    var species = $(speciesForm).find('span').text();
    var quote = $(quoteForm).val();
    // console.log(firstName, lastName, dob, bloodType, season, hobbies, trained, species, quote);
    axios.post('/api/form', {
       firstName: firstName,
       lastName: lastName,
       dob: dob,
       bloodType: bloodType,
       season: season,
       trained: trained,
       hobbies: hobbies,
       species: species,
       quote: quote,
      //hardcoding userId for testing
      userId: '1'
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
    console.log('SUBMITTED FORM, SurveyFormContainer line 65');

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} data-toggle='validator'>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="First Name"
          placeholder="enter first name"
          required='true'
        />

        <FieldGroup
          id="formControlsEmail"
          type="text"
          label="Last Name"
          placeholder="enter last name"
          required='true'
        />

        <FieldGroup
          id="formControlsDob"
          type="date"
          label="date of birth"
          required='true'
        />

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Blood Type</ControlLabel>
          <select className='selectpicker' title="warm or cold?" data-max-options="1" required='true'>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Favorite Season</ControlLabel>
          <select className='selectpicker season' title="favorite season" data-max-options="1" required='true'>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Are you House Trained?</ControlLabel>
          <select className='selectpicker' title="yes or no" data-max-options="1" required='true'>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>Select Four Favorite Hobbies</ControlLabel>
          <select className='selectpicker' multiple title="hobbies" data-max-options="4" required='true'>
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

        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>Select your Species</ControlLabel>
          <select className='selectpicker' multiple title="search or select" data-max-options="1" data-live-search="true" required='true'>
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

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Enter your favorite quote</ControlLabel>
          <FormControl componentClass="textarea" placeholder="'Nature teaches beasts to know their friends.'
          -William Shakespeare" required='true' />
        </FormGroup>

        <Button type="submit">
          Submit
        </Button>

      </form>
    )
  }
}
export default SurveyForm;
