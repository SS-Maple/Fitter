import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render, screen, fireEvent, waitFor, act } from './test-utils.jsx';
import Login from '../client/src/components/LoginForms/Login.jsx';
import Signup from '../client/src/components/LoginForms/Signup.jsx';
import ForgotPw from '../client/src/components/LoginForms/ForgotPw.jsx';
import Logout from '../client/src/components/LoginForms/Logout.jsx';
import { ProvideAuth } from '../client/src/components/user-auth.js';


configure({adapter: new Adapter()});


describe('Unit tests: Component rendering', () => {
  test('Renders Login component', () => {
    const login = shallow(<Login />);

    expect(login.exists()).toBe(true);
  })

  test('Renders Signup component', () => {
    const signup = shallow(<Signup />);

    expect(signup.exists()).toBe(true);
  })

  test('Renders ForgotPw component', () => {
    const forgot = shallow(<ForgotPw />);

    expect(forgot.exists()).toBe(true);
  })

  test('Renders Logout component', () => {
    const logout = shallow(<Logout />);

    act(() => {
      auth.user = true;
      render(<Logout />)
    });

    expect(logout.exists()).toBe(true);
  })

  test('Renders Auth Context', () => {
    const authcontext = shallow(<ProvideAuth />);

    expect(authcontext.exists()).toBe(true);
  })
})

describe('Integration tests', () => {

})