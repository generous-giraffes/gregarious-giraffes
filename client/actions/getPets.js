import axios from 'axios';
import * as types from '../constants/ActionTypes'

//action to be dispatched if getNews is successful
const getPetNewsSuccess = (data) => {
  return {
    type: types.GET_PET_NEWS,
    data: data
  }
};
//action to be dispatched if getPet is successful
const getPetSuccess = (data) => {
  return {
    type: types.GET_PET,
    data: data
  }
};

export function getPet(animal) {
  return (dispatch) => {
    return axios.post('/api/pets', {
      //possible animals: barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
      //would have to change action dispatch in petAPI and server reqUrl creation in petAppiRoutes to allow user to choose an animal
      animal: animal || 'dog',
      location: '10012'
    })
      .then((res) => {
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
        let id = pet.id ? pet.id['$t'] : null;

        let payload = {
          age: age,
          animal: animal,
          breed: breed,
          email: email,
          description: description,
          photos: photos,
          name: name,
          sex: sex,
          id: id
        };
        dispatch(getPetSuccess(payload));
      })
      .catch((err) => console.error(err))
  }
}


//This action gets pet news from the NYT api and puts it on the dashboard in the feed
export function getPetNews() {
  return (dispatch) => {
    return axios.get('/api/pets/news')
      .then((res) => {
        dispatch(getPetNewsSuccess(res));
      })
      .catch((err) => console.error(err))
  }
}
