import React, { useReducer } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import axios from "axios";
import HomeFeed from "../../client/src/components/HomeFeed/HomeFeed.jsx";
import myProfile from "../../client/src/components/myProfile/myProfile.jsx";
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Rankings from "../../client/src/components/HomeFeed/Rankings.jsx";

// @jest-environment jsdom

afterEach(cleanup);
Enzyme.configure({ adapter: new Adapter() })

xdescribe(`Home Feed`, () => {
  let email = 
  axios.get('/login')
    .then()
  xtest(`it renders home page`, () => {
    let auth = {
      userId: 2
    }
    render(<HomeFeed auth={auth} />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
