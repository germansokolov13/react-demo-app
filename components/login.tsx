import React, { useEffect } from 'react';
import { loginStore } from '../stores/login';
import config from '../env-config';

export default function Login() {
  let oauthPopup;

  const logIn = loginStore((state) => state.logIn);
  const logOut = loginStore((state) => state.logOut);
  const initStore = loginStore((state) => state.init);

  const onGetJwt = (event) => {
    if (event.origin !== config.backendAddress) {
      console.error('Security error on message');
      return;
    }
    const messageWithToken = event.data;
    logIn(messageWithToken);
    window.removeEventListener('message', onGetJwt);
    oauthPopup.close();
  };

  const onLoginClick = () => {
    oauthPopup = window.open(`${config.backendAddress}/auth/github/pre`, undefined, 'popup');
    window.addEventListener('message', onGetJwt);
  };

  useEffect(() => {
    initStore();

    return () => {
      window.removeEventListener('message', onGetJwt);
      if (oauthPopup) {
        oauthPopup.close();
      }
    };
  }, []);

  const user = loginStore((state) => state.user);

  return (
    <div className="links-block">
      {user ? (
        <>
          <strong>{user.name}</strong>
          &nbsp;|&nbsp;
          <button className="linkish-button" type="button" onClick={logOut}>Log Out</button>
        </>
      ) : (
        <button className="linkish-button" type="button" onClick={onLoginClick}>Log In</button>
      )}
    </div>
  );
}
