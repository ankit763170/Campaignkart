import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice'; // Correct import for auth-slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
