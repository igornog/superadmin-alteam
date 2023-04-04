import { Box, Grid } from '@mui/material'
import {
  AddCircle,
  ArrowLeft2,
  Edit,
  Import,
  SearchNormal1,
} from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Client from '../../../features/clients/components/ClientViewProfile/Client'
import Company from '../../../features/clients/components/ClientViewProfile/Company'
import Notes from '../../../features/clients/components/ClientViewProfile/Notes'
import { grey2, grey3 } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import ClientLogo from '../../app/clients/ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import ModalEditClient from '../../AtModal/modals/ModalEditClient'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import { StyledNavPage } from '../../AtNavPage/AtNavPage'
import AtTab from '../../AtTab/AtTab'
import { ListingType } from '@yjcapp/app'
import { Listing } from '../../../utils/redux/types/listings.type'
import { handleInitListing } from '../../../utils/redux/actions/listing.action'
import AtListingCard from '../../AtCard/AtListingCard'
import {
  getListingProjects,
  getListings,
  getListingTeams,
} from '../../../utils/redux/selectors/listing.selector'

const StyledListings = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f0f1fd;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const DrawerClientListings: React.FunctionComponent<
  DrawerClientListingsProps
> = (props: DrawerClientListingsProps) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const listProjects = useAppSelector((state) => getListingProjects(state))
  const listTeams = useAppSelector((state) => getListingTeams(state))

  const activeTab = useAppSelector((state) => getActiveTab(state))
  const dispatch = useAppDispatch()

  const [listingFilter, setListingFilter] = useState<ListingType>(
    ListingType.Project,
  )

  const listListings = useAppSelector((state) =>
    getListings(state, listingFilter),
  )

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openListingDetails, setOpenListingDetails] = useState(false)
  const [openCreateListing, setOpenCreateListing] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing>(
    new Listing({}),
  )

  const selectListing = (listing: Listing) => {
    setSelectedListing(listing)
    setOpenListingDetails(true)
  }

  const createListing = () => {
    setOpenCreateListing(true)
  }

  useEffect(() => {
    if (props.open && selectedClient.id) {
      dispatch(
        handleInitListing({
          clientId: selectedClient.id,
          // listingType: listingFilter,
        }),
      )
    }
  }, [dispatch, listingFilter, props.open, selectedClient.id])

  return (

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
            <AtTypography variant={'h4'}>All Listings</AtTypography>
            <AtButton
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              startIcon={<AddCircle />}
              name={'Create Listing'}
              onClick={createListing}
            />
          </Box>

          <StyledNavPage>
            <AtTab
              label={'Project'}
              badge={listProjects.length}
              $active={listingFilter === ListingType.Project}
              width={'50%'}
              onClick={() => setListingFilter(ListingType.Project)}
            />
            <AtTab
              label={'Teams'}
              badge={listTeams.length}
              width={'50%'}
              $active={listingFilter === ListingType.Team}
              onClick={() => setListingFilter(ListingType.Team)}
            />
          </StyledNavPage>

          <AtTextField
            disabled={!listListings?.length}
            startIcon={<SearchNormal1 />}
            placeholder={
              'Search in ' + selectedClient.companyName + ' Listings...'
            }
          />

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
                  listing={listing}
                  key={listing.id}
                  onClick={() => selectListing(listing)}
                />
              ))}
            </Box>
          )}
        </StyledListings>
      </Grid>
    </Grid>
  )
}

interface DrawerClientListingsProps {
  open?: boolean
  handleClose?: () => void
}

export default DrawerClientListings
