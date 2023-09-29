import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { ListingType } from '@yjcapp/app'
import { Listing } from '../types/listings.type'

export const getListings = createDraftSafeSelector(
  [(state) => state ],
  ({ listings }) => {
    return listings.listListings
  },
)

export const getListingTeams = createDraftSafeSelector(
  [(state) => state],
  ({ clients, listings }) => {
    return clients.selectedClient !== null && listings.listListings
      ? listings.listListings.filter(
          (listing: Listing) =>
            listing.soloClient.id === clients.selectedClient &&
            listing.listingType === ListingType.Team,
        )
      : []
  },
)

export const getListingProjects = createDraftSafeSelector(
  [(state) => state],
  ({ clients, listings }) => {
    return clients.selectedClient !== null && listings.listListings
      ? listings.listListings.filter(
          (listing: Listing) =>
            listing.soloClient.id === clients.selectedClient &&
            listing.listingType === ListingType.Project,
        )
      : []
  },
)
