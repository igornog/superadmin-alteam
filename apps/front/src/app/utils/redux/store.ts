import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settings.reducer';
import talentsReducer from './reducers/talents.reducer';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    talents: talentsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
