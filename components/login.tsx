import react, { useEffect } from 'react';
import { loginStore } from '../services/user-profile';

export default function Login() {
  let win;

  const login = loginStore(state => state.login);

  const onGetJwt = (event) => {
    const messageWithToken = event.data;
    login(messageWithToken);
    window.removeEventListener('message', onGetJwt);
    win.close();
  }

  const handleLogin = () => {
    window.addEventListener('message', onGetJwt);
    win = window.open('http://localhost:3001/auth/github', undefined, 'popup');
  }

  const user = loginStore(state => state.user);

  useEffect(() => {
    return () => {
      window.removeEventListener('message', this.onGetJwt);
      win.close();
    };
  }, []);

  return <>
    <b>{ user && user.name }</b>
    <button onClick={handleLogin} type="button">login</button>
  </>
}
