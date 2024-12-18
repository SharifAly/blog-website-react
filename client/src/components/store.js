import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Add the auth reducer to the store
    auth: authReducer,
  },
});

export default store;