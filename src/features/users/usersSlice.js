import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = `${process.env.REACT_APP_GITHUB_URL}`;

const initialState = {
  users: [],
  user: null,
  repos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  userStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
  repoStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USERS_URL}/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserRepos = createAsyncThunk(
  'users/fetchUserRepos',
  async (username, { rejectWithValue }) => {
    const params = new URLSearchParams({ sort: 'created', per_page: 10 });
    try {
      const response = await axios.get(
        `${USERS_URL}/users/${username}/repos?${params}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
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
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userStatus = 'loading';
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userStatus = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userStatus = 'failed';
    });
    builder.addCase(fetchUserRepos.pending, (state, action) => {
      state.repoStatus = 'loading';
      state.repos = [];
    });
    builder.addCase(fetchUserRepos.fulfilled, (state, action) => {
      state.repoStatus = 'succeeded';
      state.repos = action.payload;
    });
  },
});

export const getUsersStatus = (state) => state.users.status;
export const getUserStatus = (state) => state.users.userStatus;
export const getRepoStatus = (state) => state.users.repoStatus;
export const getUsers = (state) => state.users.users;
export const getUser = (state) => state.users.user;
export const getUserRepos = (state) => state.users.repos;

export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
