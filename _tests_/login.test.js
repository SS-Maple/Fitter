import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from '../client/src/components/LoginForms/Login.jsx';
import Signup from '../client/src/components/LoginForms/Signup.jsx';
import ForgotPw from '../client/src/components/LoginForms/ForgotPw.jsx';
import Logout from '../client/src/components/LoginForms/Logout.jsx';
import { ProvideAuth } from '../client/src/components/user-auth.js';


configure({adapter: new Adapter()});

const mockContext = React.createContext();
const auth = { user: 'email@test.com', userId: 8 };


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

  test('Renders Logout component', async () => {

    render(
      <ProvideAuth >
        <Logout />
      </ProvideAuth>
    )

    expect(await screen.findByText("Sign out")).toBeInTheDocument();
  })

  test('Renders Auth Context', () => {
    const authcontext = shallow(<ProvideAuth />);

    expect(authcontext.exists()).toBe(true);
  })
})

describe('Integration tests', () => {

})