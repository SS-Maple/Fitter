import React, { useReducer } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import axios from "axios";
import HomeFeed from "../../client/src/components/HomeFeed/HomeFeed.jsx";
// @jest-environment jsdom

afterEach(cleanup);

xdescribe(`Home Feed`, () => {
  let email = 
  axios.get('/login')
    .then()
  test(`it renders home page`, () => {
    let auth = {
      userId: 2
    }
    render(<HomeFeed auth={auth} />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
