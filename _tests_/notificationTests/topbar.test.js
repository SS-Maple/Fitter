import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import TopBar from '../../client/src/components/SharedComponents/TopBar.jsx';
import Logo from '../../client/src/components/SharedComponents/TopBarComponents/Logo.jsx';
import NotificationIcon from '../../client/src/components/SharedComponents/TopBarComponents/NotificationIcon.jsx';

const $ = require('jquery');

require('babel-polyfill');

describe('Renders the TopBar component', () => {
  test('renders topBar', () => {
    render(<TopBar />);
  });
});

describe('Renders emptyDiv', () => {
  test('renders emptyDiv', () => {
    render(<Logo />);
  });
});

describe('Renders navigationButton', () => {
  test('renders navigationButton', () => {
    render(<NotificationIcon />);
  });
});

describe('logoButton event handler fires when clicked', () => {
  fireEvent(node: HTMLElement, event: Event);
  fireEvent(
    getByText(container, 'FITTER'),
    new MouseEvent('click', {

    })
  )
});

// describe('notificationButton event handler fires when clicked', () => {
//   fireEvent(
//     getByText(container, 'Fitter')
//   )
// });