import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
import { shallow, configure } from 'enzyme';
import TopBar from '../../client/src/components/SharedComponents/TopBar.jsx';
import Logo from '../../client/src/components/SharedComponents/TopBarComponents/Logo.jsx';
import NotificationIcon from '../../client/src/components/SharedComponents/TopBarComponents/NotificationIcon.jsx';
import 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';

describe('Renders emptyDiv', () => {
  test('renders emptyDiv', () => {
    render (
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
  });
});

describe('Renders navigationButton', () => {
  test('renders navigationButton', () => {
    render (
      <BrowserRouter>
        <NotificationIcon />
      </BrowserRouter>
    );
  });
});
