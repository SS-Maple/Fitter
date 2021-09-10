import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import TopBar from '../../client/src/components/SharedComponents/TopBar.jsx';
import Logo from '../../client/src/components/SharedComponents/TopBarComponents/Logo.jsx';
import NotificationIcon from '../../client/src/components/SharedComponents/TopBarComponents/NotificationIcon.jsx';

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