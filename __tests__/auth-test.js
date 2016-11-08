import * as auth from '../client/actions/auth';

describe('actions', () => {
  it('should create an action to sign up a user', () => {
    const name = 'jerry'
    const email = 'giraffes@gmail.com'
    const password = 'a'
    const expectedAction = {
      type: auth.SIGNUP_USER,
      name,
      email,
      password
    }
    expect(auth.signupUser(name, email, password)).toEqual(expectedAction)
  })
})
