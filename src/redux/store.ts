import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './cameraSlice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
