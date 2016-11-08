import React from 'react'
import { shallow } from 'enzyme'
import ImageUpload from '../../container/ImageUploadContainer'

function setup() {
  // const props = {
  //   addTodo: jest.fn()
  // }

  // const enzymeWrapper = shallow(<ImageDownload {...props} />)
  const enzymeWrapper = shallow(<ImageUpload />)

  return {
    // props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('div').hasClass('imgPreview')).toBe(true)

    })

  })
})
