import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
import { shallow, configure } from 'enzyme';
import Notifications from '../../client/src/components/notifications/Notifications.jsx';
import 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';
import useAuth from '../../client/src/components/user-auth.js';

describe('Renders Notifications Component', () => {
  test('renders component', () => {
    let auth = useAuth();
    let userId = auth.userId;
    render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>
    );
  });
});

// describe("")