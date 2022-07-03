import create from 'zustand'
import jwt_decode from "jwt-decode";

export class User {
  id: string;

  name: string;

  avatar: string;
}

interface UserState {
  user: User|null;

  token: string|null

  login: (token: string) => void;

  logout: () => void;
}

export const loginStore = create<UserState>((set) => ({
  user: null,
  token: null,
  login: (token) => {
    const user = jwt_decode(token) as User;
    set({ user, token });
  },
  logout: () => set({ user: null, token: null }),
}));
