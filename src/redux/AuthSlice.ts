import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  username: string;
  id: number;
  email: string;
  password: string;
}

export interface LoginData {
  emailOrUsername: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: state => {
      state.user = null;
      state.loggedIn = false;
    },
    authenticateWithEmailOrUsername: (
      state,
      action: PayloadAction<LoginData>,
    ) => {
      const {emailOrUsername, password} = action.payload;
      const storedUsers: User[] = [];

      const user = storedUsers.find(
        user =>
          (user.email === emailOrUsername ||
            user.username === emailOrUsername) &&
          user.password === password,
      );

      if (user) {
        state.user = user;
        state.loggedIn = true;
      }
    },
  },
});

export type AuthSliceType = typeof authSlice;

export const {authenticate, logout, authenticateWithEmailOrUsername} =
  authSlice.actions;

export default authSlice.reducer;
