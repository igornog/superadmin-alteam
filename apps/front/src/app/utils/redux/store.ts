import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/app.reducer';
import clientsReducer from './reducers/clients.reducer';
import settingsReducer from './reducers/settings.reducer';
import talentsReducer from './reducers/talents.reducer';
import treeReducer from './reducers/tree.reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    talents: talentsReducer,
    clients: clientsReducer,
    tree: treeReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
