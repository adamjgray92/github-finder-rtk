import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/users/usersSlice';
import alertsReducer from '../features/alerts/alertsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    alerts: alertsReducer,
  },
});
