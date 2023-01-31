import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducers/app.reducer'
import clientsReducer from './reducers/clients.reducer'
import groupsReducer from './reducers/groups.reducer'
import listingReducer from './reducers/listing.reducer'
import settingsReducer from './reducers/settings.reducer'
import talentsReducer from './reducers/talents.reducer'

const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    talents: talentsReducer,
    clients: clientsReducer,
    listings: listingReducer,
    groups: groupsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
