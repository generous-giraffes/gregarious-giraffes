import React from 'react'
import { shallow } from 'enzyme'
import App from '../client/components/App'

function setup() {
  // const props = {
  //   aFunction: jest.fn()
  // }

  // const enzymeWrapper = shallow(<App {...props} />)
  const enzymeWrapper = shallow(<App />)

  return {
    // props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('App', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('div').hasClass('app')).toBe(true)

    })
  })
})
