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
    localStorage.setItem('listing', JSON.stringify(listingSelected))

    setSelectedListing(listingSelected)
    setOpenDrawer(true)
  }

  return (
    <Grid
      item
      xs={12}
      xl={6}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      {props.listings.map((listing: ClientListing) => {
        return (
          <AtListingCard
            onClick={() => handleClickListing(listing)}
            fullHeight
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
