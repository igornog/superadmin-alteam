import { Box, Grid } from '@mui/material'
import {
  AddCircle,
  ArrowLeft2,
  Edit,
  Import,
  SearchNormal,
} from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import Client from '../../../features/clients/components/ClientViewProfile/Client'
import Company from '../../../features/clients/components/ClientViewProfile/Company'
import Notes from '../../../features/clients/components/ClientViewProfile/Notes'
import { grey2 } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { Listing } from '../../../utils/redux/types/listings.type'
import ClientLogo from '../../app/clients/ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtListingCard from '../../AtCard/AtListingCard'
import ModalEditClient from '../../AtModal/modals/ModalEditClient'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtDrawer from '../AtDrawer'
import DrawerListing from './DrawerListing/DrawerListing'

const StyledListings = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f0f1fd;
  box-sizing: border-box;
  height: 100vh;
  overflow: scroll;
`

const DrawerClientListings: React.FunctionComponent<
  DrawerClientListingsrops
> = (props: DrawerClientListingsrops) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateListing, setOpenCreateListing] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing>(
    new Listing({}),
  )

  const selectListing = (listing: Listing) => {
    setSelectedListing(listing)
    setOpenCreateListing(true)
  }

  console.log(selectedClient)
  
  return (
    <AtDrawer
      size={'calc(100% - 145px)'}
      backgroundColor={'#F7F8FE'}
      withBackdrop={false}
      open={props.open}
      handleClose={props.handleClose}
    >
      <Grid container={true}>
        <Grid xs={8}>
          <Box display={'flex'} padding={'25px 20px 0 20px'}>
            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={props.handleClose}
              />
              <AtTypography color={grey2}>
                Back to {activeTab.title}
              </AtTypography>
            </Box>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            padding={'30px 20px 25px 20px'}
            gap={'25px'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={'flex'} gap={'20px'}>
                <Box display={'flex'} gap={'10px'}>
                  <ClientLogo logo={selectedClient.logo} width={'40px'} />
                  <AtTypography variant={'h3'}>
                    {selectedClient.name}
                  </AtTypography>
                </Box>
                <AtButton
                  kind={AtButtonKind.Default}
                  variant={AtButtonVariant.Text}
                  onClick={() => console.log('test')}
                  name={'Edit'}
                  startIcon={<Edit size={16} />}
                  fontSize={'14px'}
                />
              </Box>

              <AtButton
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Text}
                startIcon={<Import />}
                fontSize={'14px'}
                name={'Download CSV'}
              />
            </Box>

            <Company client={selectedClient} />

            <Client client={selectedClient} />

            <Notes />
          </Box>

          <ModalEditClient
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
          />
        </Grid>
        <Grid xs={4}>
          <StyledListings paddingTop={'30px'} paddingX={'20px'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <AtTypography variant={'h4'}>
                All {selectedClient.name} Listings
              </AtTypography>
              <AtButton
                kind={AtButtonKind.Success}
                variant={AtButtonVariant.Contained}
                startIcon={<AddCircle />}
                name={'Create Listing'}
                onClick={() => console.log('Create Listing')}
              />
            </Box>

            <AtTextField
              value={''}
              startIcon={<SearchNormal />}
              placeholder={'Search in ' + selectedClient.name + ' Listings...'}
            />
            <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
              {selectedClient.listings &&
                selectedClient.listings.map((listing: Listing) => (
                  <AtListingCard
                    key={listing.id}
                    listing={listing}
                    onClick={() => selectListing(listing)}
                  />
                ))}
            </Box>
          </StyledListings>
        </Grid>
      </Grid>

      <DrawerListing
        open={openCreateListing}
        selectedListing={selectedListing}
        handleClose={() => setOpenCreateListing(false)}
      />
    </AtDrawer>
  )
}

interface DrawerClientListingsrops {
  open: boolean
  handleClose: () => void
}

export default DrawerClientListings
