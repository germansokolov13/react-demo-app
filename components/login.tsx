import react, { useEffect } from 'react';
import { loginStore, User } from '../stores/user-profile';

export default function Login() {
  let win;

  const logIn = loginStore(state => state.logIn);
  const logOut = loginStore(state => state.logOut);
  const initStore = loginStore(state => state.init);

  const onGetJwt = (event) => {
    const messageWithToken = event.data;
    logIn(messageWithToken);
    window.removeEventListener('message', onGetJwt);
    win.close();
  }

  const handleLogIn = () => {
    window.addEventListener('message', onGetJwt);
    win = window.open('http://localhost:3001/auth/github', undefined, 'popup');
  }

  const user = loginStore(state => state.user);

  useEffect(() => {
    initStore();

    return () => {
      window.removeEventListener('message', onGetJwt);
      if (win) {
        win.close();
      }
    };
  }, []);

  return <>
    <div className="links-block">
      {user ? (
        <>
          <strong>{user.name}</strong>
          &nbsp;|&nbsp;
          <a className="link" role="button" onClick={logOut}>Log Out</a>
        </>
      ) : (
        <>
          <a className="link" role="button" onClick={handleLogIn}>Log In</a>
        </>
      )}
    </div>

  </>
}
