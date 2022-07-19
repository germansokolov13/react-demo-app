import create from 'zustand';
import jwt_decode from 'jwt-decode';

const LOCAL_STORAGE_KEY = 'auth-token';

export class User {
  id: string;

  name: string;

  avatar: string;

  exp: number;
}

interface LoginState {
  user: User | null;

  token: string | null

  init: () => void;

  logIn: (token: string) => void;

  logOut: () => void;
}

export const loginStore = create<LoginState>((set) => ({
  user: null,

  token: null,

  init: () => {
    const possibleToken = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (possibleToken) {
      try {
        const possibleUser = jwt_decode(possibleToken) as User;
        const isStillValid = Date.now() < possibleUser.exp * 1000;
        if (isStillValid) {
          set({ user: possibleUser, token: possibleToken });
        } else {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Token decode failed', e);
      }
    }
  },

  logIn: (token) => {
    const user = jwt_decode(token) as User;
    set({ user, token });
    window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
  },

  logOut: () => {
    set({ user: null, token: null });
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  },
}));
