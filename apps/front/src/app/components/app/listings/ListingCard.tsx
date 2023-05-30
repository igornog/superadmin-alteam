import React, { useState } from 'react'
import AtListingCard from '../../AtCard/AtListingCard'
import { ClientListing } from '@yjcapp/app'
import DrawerListing from '../../AtDrawer/drawers/DrawerListing/DrawerListing'

const ListingCard: React.FunctionComponent<ListingCardProps> = (
  props: ListingCardProps,
) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  
  return (
    <>
      <AtListingCard
        onClick={() => props.openListing(props.listing)}
        fullHeight={true}
        listing={props.listing}
      />

      <DrawerListing
        open={openDrawer}
        selectedListing={props.listing}
        handleClose={() => setOpenDrawer(false)}
      />
    </>
  )
}

interface ListingCardProps {
  listing: ClientListing
  openListing: (listingSelected: ClientListing) => void
}

export default ListingCard
