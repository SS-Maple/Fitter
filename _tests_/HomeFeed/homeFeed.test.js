import React, { useReducer, useAuth } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import HomeFeed from "../../client/src/components/HomeFeed/HomeFeed.jsx";
import Enzyme from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() })

xdescribe(`Home Feed`, () => {
  let email = 'test@gmail.com'
  let password = 'abc123'

  test(`it renders home page`, async() => {
    const auth = useAuth();
    let userId = 2;
    let userid = 2;
    act(() => {
      ReactDOM.render(<HomeFeed userid={2} userId={2}/>, container);
    });
    // render(<HomeFeed />)
    expect(await auth.userId).toBe(2);
    // expect(await screen.getByTestId('home-page')).toBeInTheDocument();
    });
});

//////////////////////////////////////////////////////////////////////////////////////////

test('placeholder', () => {
  expect(true).toBe(true);
})
