import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = `${process.env.REACT_APP_GITHUB_URL}`;

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (search) => {
    try {
      const response = await axios.get(
        `${USERS_URL}/search/users?q=${search}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );
      return response.data.items;
    } catch (err) {
      return err.message;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state, action) {
      state.users = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(searchUsers.pending, (state, action) => {
      state.status = 'loading';
      state.users = [];
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = state.users.concat(action.payload);
    });
  },
});

export const getUsersStatus = (state) => state.users.status;
export const getUsers = (state) => state.users.users;

export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
