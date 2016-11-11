import axios from 'axios';

export const GET_PET = 'GET_PET';
export const GET_PET_NEWS = 'GET_PET_NEWS';

//action to be dispatched if getNews is successful
const getPetNewsSuccess = (data) => {
  return {
    type: GET_PET_NEWS,
    data: data
  }
};
//action to be dispatched if getPet is successful
const getPetSuccess = (data) => {
  return {
    type: GET_PET,
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

        let payload = {
          age: age,
          animal: animal,
          breed: breed,
          email: email,
          description: description,
          photos: photos,
          name: name,
          sex: sex
        };
        dispatch(getPetSuccess(payload));
      })
      .catch((err) => console.error(err))
  }
}

export function getPetNews() {
  return (dispatch) => {
    return axios.get('/api/pets/news')
      .then((res) => {
        dispatch(getPetNewsSuccess(res));
      })
      .catch((err) => console.error(err))
  }
}
