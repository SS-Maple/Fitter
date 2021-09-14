import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendProfile from "../client/src/components/friendProfile/friendProfile.jsx";
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
// @jest-environment jsdom

configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('Friend Profile Component', () => {
  test('it renders', () => {
    render(<FriendProfile />);
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

});
