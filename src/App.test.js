import React from 'react';
import App from './App';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import GifsStore from './stores/GifsStore'

function mockResponse (status, statusText, body) {
  return new window.Response(JSON.stringify(body), {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  })
}

let gifMock = {
  images: {
    fixed_width: {
      url: 'gif-url.gif'
    }
  }
}

beforeEach(() => {
  // Mock fetch
  global.fetch = jest.fn().mockImplementation(() =>
     Promise.resolve(mockResponse(200, '', { data: [gifMock] }))
  )
})

afterEach(() => {
  global.fetch.mockReset()
  GifsStore.gifs = []
})

it('adds a new gif when clicking add button', function(done) {
  let wrapper = mount(<App GifsStore={GifsStore} />)
  wrapper.find('#add').simulate('click')

  // Have to use nextTick() here because of the
  // test not seeing the updated store after
  // the simulated click and fetch() mock. ~shrug~
  process.nextTick(() => {
    expect(GifsStore.gifs).toHaveLength(1)
    expect(toJson(wrapper)).toMatchSnapshot()
    done()
  })
})

it('should remove a gif when clicking it', function() {
  GifsStore.gifs.push(gifMock)

  let wrapper = mount(<App GifsStore={GifsStore} />)

  wrapper.find('a').simulate('click')

  expect(GifsStore.gifs).toHaveLength(0)
})

it('should remove last gif when clicking it', function() {
  GifsStore.gifs.push(gifMock)
  GifsStore.gifs.push(gifMock)

  let wrapper = mount(<App GifsStore={GifsStore} />)

  expect(GifsStore.gifs).toHaveLength(2)
  wrapper.find('#removeLast').simulate('click')
  expect(GifsStore.gifs).toHaveLength(1)
})

it('should render no gifs', () => {
  let wrapper = mount(<App GifsStore={GifsStore} />)

  expect(GifsStore.gifs).toHaveLength(0)
  expect(toJson(wrapper)).toMatchSnapshot()
});

it('should render one gif', () => {
  GifsStore.gifs.push(gifMock)
  var wrapper = mount(<App GifsStore={GifsStore} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})