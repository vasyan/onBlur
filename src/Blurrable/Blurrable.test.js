import React from 'react'
import { shallow } from 'enzyme'
import Blurrable from 'index'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Blurrable />)
    expect(wrapper).toHaveLength(1)
  })
})
