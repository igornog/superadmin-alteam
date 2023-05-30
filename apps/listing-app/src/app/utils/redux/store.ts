import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './reducers/listing.reducer'
import clientsReducer from './reducers/clients.reducer'
const store = configureStore({
  reducer: {
    listings: listingReducer,
    clients: clientsReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
