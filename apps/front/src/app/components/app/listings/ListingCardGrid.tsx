import { Grid } from '@mui/material'
import React, { useState } from 'react'
import DrawerListing from '../../AtDrawer/drawers/DrawerListing/DrawerListing'
import { ClientListing } from '@yjcapp/app'
import AtListingCard from '../../AtCard/AtListingCard'

interface ListingCardProps {
  listings: ClientListing[]
}

const ListingCardGrid: React.FC<ListingCardProps> = (
  props: ListingCardProps,
) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedListing, setSelectedListing] = useState<ClientListing>()

  const handleClickListing = (listingSelected: ClientListing) => {
    setSelectedListing(listingSelected)
    setOpenDrawer(true)
  }

  return (
    <Grid
      item={true}
      xs={12}
      xl={6}
      display={'flex'}
      flexDirection={'column'}
    >
      {props.listings.map((listing: ClientListing) => {
        return (
          <AtListingCard
            onClick={() => handleClickListing(listing)}
            fullHeight={true}
            listing={listing}
          />
        )
      })}

      {selectedListing &&
        <DrawerListing
          open={openDrawer}
          selectedListing={selectedListing}
          handleClose={() => setOpenDrawer(false)}
        />}
    </Grid>
  )
}

export default ListingCardGrid
