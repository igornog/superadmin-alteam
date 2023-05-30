import { Grid } from '@mui/material'
import React from 'react'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import ListingCardGrid from '../../../../components/app/listings/ListingCardGrid'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { ListingType } from '@yjcapp/app'

const TeamsView: React.FunctionComponent = () => {
  const listings = useAppSelector((state) => state.listings)
  const teamListings = listings.listListings.filter((listing) => listing.listingType === ListingType.Team)

  return teamListings.length === 0 ? (
    <AtNoResult sentence={`No Team Listings`} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <Grid container={true} spacing={2.5} alignItems={'stretch'}>
          <ListingCardGrid listings={teamListings} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeamsView
