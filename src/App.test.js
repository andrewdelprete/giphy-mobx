import React from 'react';
import ReactDOM from 'react-dom';
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

beforeEach(() => {
  const newGif = {
    images: {
      fixed_width: {
        url: 'new-it.gif'
      }
    }
  }

  // Mock fetch
  global.fetch = jest.fn().mockImplementation(() =>
     Promise.resolve(mockResponse(200, '', { data: [newGif] }))
  )
})

afterEach(() => {
  global.fetch.mockReset()
  GifsStore.gifs = []
})

it('adds a new gif when clicking add button', function(done) {
  let wrapper = mount(<App GifsStore={GifsStore} />)

  wrapper.find('#add').simulate('click')

  process.nextTick(() => {
    expect(GifsStore.gifs).toHaveLength(1)
    expect(toJson(wrapper)).toMatchSnapshot()
    done()
  })
})

it('should remove a gif when clicking it', function() {
  GifsStore.gifs = [{
    images: {
      fixed_width: {
        url: 'https://media1.giphy.com/media/we1KGq2yvN65a/200w.gif'
      }
    }
  }]

  let wrapper = mount(<App GifsStore={GifsStore} />)

  wrapper.find('a').simulate('click')

  expect(GifsStore.gifs).toHaveLength(0)
})

it('should remove last gif when clicking it', function() {
  GifsStore.gifs = [
    {
      images: {
        fixed_width: {
          url: 'new-gif.gif'
        }
      }
    },
    {
      images: {
        fixed_width: {
          url: 'new-gif-2.gif'
        }
      }
    }
  ]

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
  GifsStore.gifs = [{
    images: {
      fixed_width: {
        url: 'https://media1.giphy.com/media/we1KGq2yvN65a/200w.gif'
      }
    }
  }]

  var wrapper = mount(<App GifsStore={GifsStore} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})