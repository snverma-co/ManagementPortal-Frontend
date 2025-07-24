import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import clientReducer from './slices/clientSlice.js';
import taskReducer from './slices/taskSlice.js';
import documentReducer from './slices/documentSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    tasks: taskReducer,
    documents: documentReducer
  }
});

export default store;