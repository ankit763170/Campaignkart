import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice'; // Correct import for auth-slice
import generalReducer from './features/general-reducer'
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
    general: generalReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
