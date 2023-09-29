import { Grid } from '@mui/material'
import React from 'react'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import ListingCardGrid from '../../../../components/app/listings/ListingCardGrid'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { sortBy } from '../../../../utils/helpers'
import { ListingType } from '@yjcapp/app'

const TeamsView: React.FunctionComponent = () => {
  const listings = useAppSelector((state) => state.listings)
  const settings = useAppSelector((state) => state.settings)
  const teamListings = listings.listListings.filter((listing) => listing.listingType === ListingType.Team)

  const listingsSorted = settings.sort
    ? sortBy(settings.sort, teamListings)
    : teamListings

  return listings.listListings.length === 0 ? (
    <AtNoResult sentence={`No Team Listings`} />
  ) : (
    <Grid container spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item xs={12}>
        <Grid container spacing={2.5} alignItems={'stretch'}>
          <ListingCardGrid listings={listingsSorted} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeamsView
