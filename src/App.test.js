import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {mount} from 'enzyme';
import { Provider } from 'mobx-react'
import { observable } from 'mobx'
import toJson from 'enzyme-to-json';

const mockResponse = (status, statusText, body) => {
  return new window.Response(JSON.stringify(body), {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

it('adds a new gif when clicking add button', async function() {
  global.fetch = require('jest-fetch-mock')

  const gifs = observable([])

  const newGif = {
    images: {
      fixed_width: {
        url: 'add-test.gif'
      }
    }
  }

  window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, { data: [newGif] })))

  const wrapper = mount(
    <Provider gifs={gifs}>
      <App />
    </Provider>,
  )

  wrapper.find('button#add').simulate('click')
  expect(wrapper.update().find('a')).toHaveLength(1)
});

// it('renders empty gifs', () => {
// const gifs = observable([])

//   var wrapper = mount(
//     <Provider gifs={gifs}>
//       <App />
//     </Provider>,
//   )

//   expect(toJson(wrapper)).toMatchSnapshot()
// });

// it('renders one gif', () => {
//   const gifs = observable([{
//     images: {
//       fixed_width: {
//         url: 'https://media1.giphy.com/media/we1KGq2yvN65a/200w.gif'
//       }
//     }
//   }])

//   var wrapper = mount(
//     <Provider gifs={gifs}>
//       <App />
//     </Provider>,
//   )

//   expect(toJson(wrapper)).toMatchSnapshot()
// });

// jest.mock('./helpers/gifs', () => {
//   return {
//     getRandomGif: new Promise()
//   }
// })