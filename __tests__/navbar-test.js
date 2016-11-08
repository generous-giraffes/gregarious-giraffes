import React from 'react'
import { shallow } from 'enzyme'
import Navbar from '../client/components/Navbar'

function setup() {

  const enzymeWrapper = shallow(<Navbar/>)

  return {
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Navbar', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('header').hasClass('header')).toBe(true)
    })
  })
})
