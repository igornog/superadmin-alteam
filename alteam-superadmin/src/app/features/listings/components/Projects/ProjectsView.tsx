import { Grid } from '@mui/material'
import React from 'react'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import ListingCardGrid from '../../../../components/app/listings/ListingCardGrid'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { ListingType } from '@yjcapp/app'
import { sortBy } from '../../../../utils/helpers'

const ProjectsView: React.FunctionComponent = () => {
  const listings = useAppSelector((state) => state.listings)
  const projectListings = listings.listListings.filter((listing) => listing.listingType === ListingType.Project)
  const settings = useAppSelector((state) => state.settings)

  const listingsSorted = settings.sort
    ? sortBy(settings.sort, projectListings)
    : projectListings

  return (
    listings.listListings.length === 0 ?
      <AtNoResult sentence={`No Project Listings`} />
      :
      <Grid container spacing={2.5} marginTop={0} alignItems={'stretch'}>
        <Grid item xs={12}>
          <Grid container spacing={2.5} alignItems={'stretch'}>
            <ListingCardGrid listings={listingsSorted} />
          </Grid>
        </Grid>
      </Grid>

  )
}

export default ProjectsView
