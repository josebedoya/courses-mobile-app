import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../../api';
import setAuthToken from '../../utils/setAuthToken';

const initialState = {
  isRequesting: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

// First, create the thunk
export const loginRequest = createAsyncThunk(
  'login/loginRequest',
  async (data, { rejectWithValue }) => {
    try {
      // console.log(data);
      const response = await API.post('/auth/signin', JSON.stringify(data));
      const { accessToken } = response.data;
      await AsyncStorage.setItem('@token_Key', accessToken);
      // set token to Auth header
      setAuthToken(accessToken);
      // decode token to get user data
      const decoded = jwt_decode(accessToken);
      const userData = {...decoded, ...response.data};
      // console.log(userData);
      return userData;
      // return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      const { payload } = action;
      state.isAuthenticated = true;
      state.user = payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('token');
      setAuthToken(false);
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginRequest.pending, (state) => {
      state.isRequesting = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      const { payload } = action;
      state.isRequesting = false;
      state.isAuthenticated = true;
      state.user = payload;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      const { payload } = action;
      state.isRequesting = false;
      state.isAuthenticated = false;
      state.error = payload;
    });
  },
});

export const { setLoggedUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
