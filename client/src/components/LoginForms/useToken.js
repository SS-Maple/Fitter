import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    if (userToken) {
      return userToken
    };
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken.token));
    sessionStorage.setItem('userId', JSON.stringify(userToken.userId));
    setToken(userToken.token);
  }

  return {
    setToken: saveToken,
    token
  }
}
