import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './cameraSlice';
import menuReducer from './menuSlice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
