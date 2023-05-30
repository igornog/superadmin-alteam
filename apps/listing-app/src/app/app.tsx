import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './views/home'
import GeneralInfoForm from './views/generalInfo'
import CreateListingStart from './components/Form/ListingsForm/CreateListing/CreateListingStart'
import { useAuth0 } from '@auth0/auth0-react'
import ListingDetails from './views/listingDetails'

export const App: React.FC = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth0();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingDetails />} />

      {isAuthenticated ?
        <>
          <Route path="/form" element={<GeneralInfoForm />} />
          <Route path="/create-my-listing" element={<CreateListingStart />} />
        </>
        : null}
    </Routes>
  )
}

export default App
