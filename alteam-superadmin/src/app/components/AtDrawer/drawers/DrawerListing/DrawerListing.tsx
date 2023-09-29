import { Box, Collapse, Grid } from '@mui/material'
import { ArrowDown, ArrowLeft2, ArrowUp, Edit, Status } from 'iconsax-react'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Roles from './Roles'
import { grey2 } from '../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtGroupTag from '../../../AtGroupTag/AtGroupTag'
import AtTypography from '../../../AtTypography/AtTypography'
import AtDrawer from '../../AtDrawer'
import DrawerTalent from '../DrawerTalent'
import GeneralInformations from './GeneralInformations'
import JobDescription from './JobDescription'
import ScreeningQuestions from './ScreeningQuestions'
import AtStatusTag from '../../../AtStatusTag/AtStatusTag'
import { ClientListing, ListingState, ListingStatus } from '@yjcapp/app'
import AtDropdown from '../../../AtDropdown/AtDropdown'
import Skills from './Skills'
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'
import ModalListingName from '../../../AtModal/modals/listings/ModalListingName'
import ModalPushNotification from '../../../AtModal/modals/listings/ModalPushNotification'
import { getListings } from '../../../../utils/redux/selectors/listing.selector'

const StyledCollapse = styled(Collapse) <{ isOpen: boolean }>`
  position: relative;

  &:before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    ${({ isOpen }) =>
    !isOpen &&
    css`
        content: '';
        background: linear-gradient(
          0deg,
          rgba(251, 252, 255, 1) 25%,
          rgba(0, 0, 0, 0) 100%
        );
      `}
  }
`

const DrawerListing: React.FunctionComponent<DrawerListingProps> = (
  props: DrawerListingProps,
) => {
  const [collapseWhole, setCollapseWhole] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openListingNameModal, setOpenListingNameModal] = useState(false)
  const [openPushNotificationModal, setOpenPushNotificationModal] = useState(false)
  const dispatch = useAppDispatch()
  const activeListing = useAppSelector((state) => getListings(state)).find((listing: ClientListing) => props.selectedListing.id ? listing.id === props.selectedListing.id : null)

  const handleStatusChange = (statusValue: ListingState) => {
    dispatch(handleUpdateListing({ id: props.selectedListing.id, status: statusValue }))
  }

  return (
    <AtDrawer
      size={'calc(100% - 145px)'}
      backgroundColor={'#F7F8FE'}
      withBackdrop={false}
      open={props.open}
      handleClose={props.handleClose}
    >
      <Grid container>
        <Grid xs={12} item>
          <Box
            display={'flex'}
            flexDirection={'column'}
            padding={'25px 20px 25px 20px'}
            gap={'25px'}
          >
            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={props.handleClose}
              />
              <AtTypography color={grey2}>
                Back
              </AtTypography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                <AtGroupTag
                  label={activeListing?.soloClient?.companyName}
                  fontSize={'14px'}
                />
                <AtTypography variant={'h3'}>
                  {activeListing?.listingName}
                </AtTypography>
                <Edit
                  cursor={'pointer'}
                  size={16}
                  onClick={() => setOpenListingNameModal(true)}
                />
                <Box marginLeft={'10px'}>
                  <AtStatusTag status={ListingStatus.Active} label={activeListing?.listingType} />
                </Box>
              </Box>

              <Box display={'flex'} gap={'10px'}>
                <AtTypography color={grey2}>
                  <Status size={20} />
                  Status:
                </AtTypography>
                <AtDropdown
                  placeholder={activeListing?.status}
                  kind={AtButtonKind.Default}
                  $listingStatus
                  $listItems={
                    [
                      { id: 1, value: ListingStatus.Active, label: ListingStatus.Active },
                      { id: 2, value: ListingStatus.Disabled, label: ListingStatus.Disabled },
                      { id: 3, value: ListingStatus.Ended, label: ListingStatus.Ended },
                    ]
                  }
                  status={activeListing?.status}
                  variant={AtButtonVariant.Contained}
                  handleselect={(e) => handleStatusChange(e.value as ListingState)}
                  fontSize='14px'
                />
                <AtButton
                  variant={AtButtonVariant.Contained}
                  kind={AtButtonKind.Secondary}
                  name={'Push notification'}
                  onClick={() => setOpenPushNotificationModal(true)}
                />
              </Box>
            </Box>

            <StyledCollapse
              in={collapseWhole}
              isOpen={collapseWhole}
              collapsedSize={'60vh'}
            >
              {activeListing &&
                <Box display={'flex'} flexDirection={'column'} gap={'25px'}>
                  <GeneralInformations selectedListing={activeListing} />
                  <JobDescription selectedListing={activeListing} />
                  {activeListing.roles.length ?
                    <Roles selectedListing={activeListing} /> : null
                  }
                  <Skills selectedListing={activeListing} />
                  <ScreeningQuestions selectedListing={activeListing} />
                </Box>}
            </StyledCollapse>

            <Box display={'flex'} justifyContent={'center'}>
              <AtButton
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Text}
                startIcon={collapseWhole ? <ArrowUp /> : <ArrowDown />}
                name={`${collapseWhole ? 'Collapse' : 'Open'} ${activeListing?.listingType} Details`}
                fontSize={'14px'}
                onClick={() => setCollapseWhole(!collapseWhole)}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
              <Grid container spacing={2.5} alignItems={'stretch'}>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <DrawerTalent
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />


      <ModalListingName
        open={openListingNameModal}
        listing={activeListing}
        onClose={() => setOpenListingNameModal(false)}
      />

      {openPushNotificationModal &&
        <ModalPushNotification
          open={openPushNotificationModal}
          listing={activeListing}
          onClose={() => setOpenPushNotificationModal(false)}
        />
      }
    </AtDrawer>
  )
}

interface DrawerListingProps {
  open: boolean
  handleClose: () => void
  selectedListing: ClientListing
}

export default DrawerListing
