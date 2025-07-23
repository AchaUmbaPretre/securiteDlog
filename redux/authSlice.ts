import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      AsyncStorage.setItem('token', action.payload); 
    },
    logout(state) {
      state.token = null;
      AsyncStorage.removeItem('token');
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { loginSuccess, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
