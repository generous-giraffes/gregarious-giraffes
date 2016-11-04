import React from 'react';
import Form, { Model, Input, Fieldset } from 'react-semantic-form';

//attributes set the attributes of the form
const attributes = [
  { name: 'firstName', type: 'TEXT', label: 'First Name', description: 'enter your first name', required: true  },
  { name: 'lastName', type: 'TEXT', label: 'Last Name', description: 'enter your last name', required: true  },
  { name: 'blood', type: 'TEXT', label: 'Blood Type', description: 'select your blood type', required: true  },
  { name: 'dob', type: 'DATE', label: 'Date of Birth', description: 'When were you born', required: true,
    options: {
      coldBlooded: 'Cold Blooded',
      warmBlooded: 'Warm Blooded'
    }, minSelection: 1, maxSelection: 1, optionClass: 'col-md-4'},
  { name: 'ageRange', type: 'Checkbox', label: 'Age in Human Years', description: 'what is your age', required: true,
    options: {
      '0-2': '0-2',
      '3-5': '3-5',
      '6-10': '6-10',
      '11-30': '11-30',
      '31+': '31+'
    }, minSelection: 1, maxSelection: 1, optionClass: 'col-md-4 checkbox' },
  { name: 'hobbies', type: 'Checkbox', label: 'Select Four of your Favorite Hobbies', description: 'what are your hobbies', required: true,
    options: {
      walk: 'Walking',
      run: 'Running',
      fly: 'Flying',
      nap: 'Napping',
      swim: 'Swimming'
      sun: 'Sunbathing',
      eat: 'Eating',
      play: 'Playing',
      presents: 'Bringing Presents Home'
      learn: 'Learning New Tricks'
      fetch: 'Playing Fetch',
      break: 'Breaking Rules',
      tv: 'Wathcing tv',
      read: 'Reading',
      code: 'Coding',
      music: 'Playing/Listening to music',
      steal: 'Stealing Socks',
      mark: 'Marking'
    }, minSelection: 4, maxSelection: 4, optionClass: 'col-md-4 checkbox' },
  { name: 'species', type: 'Checkbox', label: 'Select your Species', description: 'what is your species', required: true,
    options: {
      giraffe: 'Giraffe, Giraffa camelopardalis'
      dog: 'Dog, Canis lupus familiaris',
      cat: 'Cat, Felis silvestris catus',
      sheep: 'Ovis aries',
      pig: 'Pig, Sus scrofa domesticus',
      goat: 'Goat, Capra aegagrus hircus',
      cow: 'cow, Bos taurus',
      chicken: 'Chicken, Gallus gallus domesticus'
      duck: 'Duck, Anas platyrhynchos domesticus',
      horse: 'Horse, Equus ferus caballus',
      goldfish: 'Goldfish, Carassius auratus auratus',
      koi: 'Koi, Cyprinus carpio haematopterus',
      hedgehog: 'hedgehog, Atelerix albiventris',
      camel: 'Camel, Camelus dromedarius'
    }, minSelection: 1, maxSelection: 1, optionClass: 'col-md-4 checkbox' },
    { name: "quote", type: "TextArea", label: "Favorite Quote" },
    { name: "file", type: "File", label: "Attach File" }
];

//the Form component renders the survey form and sends the responses on submit as a json object to '/survey'
class Form extends React.Component {
  //render footer when that component is made
    render() {
      return (
        <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Form action='/survey' method='POST' className='survey' attributes={attributes}>
            <Model />
            <Input type="TextArea" name="additional" label="About Me" />
            <Fieldset label="">
              <button type="submit" className="btn btn-secondary">Submit</button>
            </Fieldset>
          </Form>
        </div>
      </div>
      )
    }
}
