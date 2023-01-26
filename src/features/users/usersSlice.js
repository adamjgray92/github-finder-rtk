import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GITHUB_URL = `${process.env.REACT_APP_GITHUB_URL}`;

const githubAPI = axios.create({
  baseURL: GITHUB_URL,
  // headers: {
  //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  // },
});

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
  async (search, { rejectWithValue }) => {
    try {
      const response = await githubAPI.get(`/search/users?q=${search}`);

      return response.data.items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (username, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ sort: 'created', per_page: 10 });
      const [user, repos] = await Promise.all([
        githubAPI.get(`/users/${username}`),
        githubAPI.get(`/users/${username}/repos?${params}`),
      ]);

      return { user: user.data, repos: repos.data };
    } catch (err) {
      return rejectWithValue(err.message);
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
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.users = [];
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userStatus = 'loading';
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { user, repos } = action.payload;
      state.userStatus = 'succeeded';
      state.user = user;
      state.repos = repos;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userStatus = 'failed';
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
