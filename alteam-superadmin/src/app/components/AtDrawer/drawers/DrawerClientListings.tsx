import { Box, Grid } from '@mui/material'
import {
  AddCircle,
  ArrowLeft2,
  CloseSquare,
  Edit,
  Import,
  TickSquare
} from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Client from '../../../features/clients/components/ClientViewProfile/Client'
import Company from '../../../features/clients/components/ClientViewProfile/Company'
import Notes from '../../../features/clients/components/ClientViewProfile/Notes'
import { grey2, grey3, white } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import ClientLogo from '../../app/clients/ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import ModalEditClient from '../../AtModal/modals/ModalEditClient'
import AtTypography from '../../AtTypography/AtTypography'
import { ClientListing, ClientStatus, ListingType } from '@yjcapp/app'
import { Listing } from '../../../utils/redux/types/listings.type'
import { handleInitListing } from '../../../utils/redux/actions/listing.action'
import AtListingCard from '../../AtCard/AtListingCard'
import {
  getListings,
} from '../../../utils/redux/selectors/listing.selector'
import AtDrawer from '../AtDrawer'
import { Tabs } from '../../../utils/types'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import DrawerListing from './DrawerListing/DrawerListing'

const StyledDrawer = styled(AtDrawer)`
  display: flex;
  flex-direction: row;
`

const StyledListings = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f0f1fd;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 120vh;
  overflow-x: hidden;
`

const DrawerClientListings: React.FunctionComponent<
  DrawerClientListingsProps
> = (props: DrawerClientListingsProps) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedListing, setSelectedListing] = useState<ClientListing>()
  const dispatch = useAppDispatch()
  const [listingFilter, setListingFilter] = useState<ListingType>(
    ListingType.Project,
  )

  const listListings = useAppSelector((state) =>
    getListings(state),
  )

  const [openEditModal, setOpenEditModal] = useState(false)

  const updateStatus = (status: ClientStatus) => {
    dispatch(handlePatchClient({ id: selectedClient.id, status: status }))
    props.handleClose()
  }

  const handleClickListing = (listingSelected: ClientListing) => {
    localStorage.setItem('listing', JSON.stringify(listingSelected))

    setSelectedListing(listingSelected)
    setOpenDrawer(true)
    props.handleClose()
  }

  useEffect(() => {
    if (props.open && selectedClient.id) {
      dispatch(
        handleInitListing({
          clientId: selectedClient.id,
        }),
      )
    }
  }, [dispatch, listingFilter, props.open, selectedClient.id])

  return (
    <>
      <StyledDrawer
        size={'100%'}
        backgroundColor={white}
        flexDirection={'row'}
        withBackdrop
        open={props.open}
        handleClose={props.handleClose}
      >
        <Grid md={5}>
          <Grid>
            <Box display={'flex'} padding={'25px 20px 0 20px'}>
              <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                <AtButton
                  variant={AtButtonVariant.Contained}
                  startIcon={<ArrowLeft2 />}
                  kind={AtButtonKind.Default}
                  onClick={props.handleClose}
                />
                <AtTypography color={grey2}>Back to {activeTab.title}</AtTypography>
              </Box>
            </Box>
          </Grid>

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
              <Box display={'flex'} gap={'20px'} alignItems={'center'}>
                <Box display={'flex'} gap={'10px'}>
                  <ClientLogo logo={selectedClient.logo} width={'40px'} />
                  <AtTypography variant={'h3'}>
                    {selectedClient.companyName}
                  </AtTypography>
                </Box>
                <AtButton
                  padding={'0'}
                  kind={AtButtonKind.Default}
                  variant={AtButtonVariant.Text}
                  onClick={() => setOpenEditModal(true)}
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

            <Notes client={selectedClient} />

            <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>

              <AtButton
                onClick={() => updateStatus(ClientStatus.Declined)}
                kind={AtButtonKind.Danger}
                variant={AtButtonVariant.Contained}
                name={'Decline'}
                endIcon={<CloseSquare size={16} />}
              />

              <AtButton
                onClick={() => updateStatus(ClientStatus.Inactive)}
                kind={AtButtonKind.Default}
                variant={
                  activeTab.title === Tabs.DeclinedRequests
                    ? AtButtonVariant.Contained
                    : AtButtonVariant.Outlined
                }
                name={'Move to Inactive'}
                endIcon={
                  activeTab.title === Tabs.DeclinedRequests ? (
                    <AddCircle size={16} />
                  ) : (
                    <TickSquare size={16} />
                  )
                }
              />
            </Box>
          </Box>

          <ModalEditClient
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
          />
        </Grid>

        {listListings.length === 0 ?
        <StyledListings padding={'30px'} paddingX={'20px'} borderRadius={'5px'} width={'60%'}>
              <AtTypography variant={'h4'}>No Listings yet.</AtTypography> </StyledListings>: (
            <Grid md={7}>
              <StyledListings padding={'30px'} paddingX={'20px'} borderRadius={'5px'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <AtTypography variant={'h4'}>Listings</AtTypography>
                  {/* <AtButton
                    kind={AtButtonKind.Success}
                    variant={AtButtonVariant.Contained}
                    startIcon={<AddCircle />}
                    name={'Create Listing'}
                    onClick={createListing}
                  /> */}
                </Box>

                {listListings.length === 0 ? (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={'70%'}
                  >
                    <AtTypography variant={'h3'} color={grey3}>
                      No Active Listings
                    </AtTypography>
                  </Box>
                ) : (
                  <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
                    {listListings.map((listing: Listing) => (
                      <AtListingCard
                        onClick={() => handleClickListing(listing)}
                        fullHeight
                        listing={listing}
                      />
                    ))}
                  </Box>
                )}
              </StyledListings>
            </Grid>
          )}
      </StyledDrawer>
      {selectedListing &&
        <DrawerListing
          open={openDrawer}
          selectedListing={selectedListing}
          handleClose={() => setOpenDrawer(false)}
        />}
    </>
  )
}

interface DrawerClientListingsProps {
  open: boolean
  handleClose: () => void
}

export default DrawerClientListings
