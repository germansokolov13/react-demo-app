import create from 'zustand'
import jwt_decode from "jwt-decode";

export class User {
  id: string;

  name: string;

  avatar: string;

  exp: number;
}

interface UserState {
  user: User|null;

  token: string|null

  init: () => void;

  logIn: (token: string) => void;

  logOut: () => void;
}

export const loginStore = create<UserState>((set) => ({
  user: null,

  token: null,

  init: () => {
    const possibleToken = window.localStorage.getItem('auth-token');
    if (possibleToken) {
      try {
        const possibleUser = jwt_decode(possibleToken) as User;
        if (Date.now() < possibleUser.exp * 1000) {
          set({ user: possibleUser, token: possibleToken });
        } else {
          window.localStorage.removeItem('auth-token');
        }
      } catch (e) {
        console.error('Token decode failed', e);
      }
    }
  },

  logIn: (token) => {
    const user = jwt_decode(token) as User;
    set({ user, token });
    window.localStorage.setItem('auth-token', token);
  },

  logOut: () => {
    set({ user: null, token: null });
    window.localStorage.removeItem('auth-token');
  },
}));
