import { createSlice } from '@reduxjs/toolkit';

const initialState = { alert: null };

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    },
    clearAlert(state, action) {
      state.alert = null;
    },
  },
});

export const getAlert = (state) => state.alerts.alert;

export const { setAlert, clearAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
