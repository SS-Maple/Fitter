import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import axios from 'axios';
import { debug } from 'webpack';

import TopBar from '../../client/src/components/SharedComponents/TopBar.jsx';

require('babel-polyfill');

describe('Renders the TopBar component', () => {
  render(<TopBar />);
});

describe('Renders the topbar component\'s 4 main elements', () => {
  test('renders emptyDiv'), () => {
    let emptyDiv = document.getElementById('emptyDiv');
    expect(emptyDiv).toBeTruthy();
  };

  test('renders logoButton', () => {
    expect(screen.getByText(/FITTER/)).toBeInTheDocument();
  });

  test('renders navigationButton', () => {
    let navigationButton = document.getElementById('navigationButton');
    expect(navigationButton).toBeTruthy();
  });

  test('renders navigationLogo', () => {
    expect(screen.getByText(/&#9742/)).toBeInTheDocument();
  });
});

describe('logoButton event handler', () => {
  test('button fires when clicked', () => {
    let logoButton = document.getElementById('logoButton');
    fireEvent.click(logoButton);
    expect(onClick).toBeCalled();
  });
});

describe('notificationButton cevent handler', () => {
  test('button fires when clicked', () => {
    let notificationButton = document.getElementById('notificationButton');
    fireEvent.click(notificationButton);
    expect(onClick).toBeCalled();
  });
});