import { Box, Container, Grid } from '@mui/material'
import { ArrowLeft2 } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { white, grey2, grey5, green } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { boxShadow } from '../../../../utils/theme'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'
import AtDrawer from '../../AtDrawer'
import CreateProjectListing from './Project/CreateProjectListing'
import FolderIcon from '../../../../assets/images/icons/folder.svg'
import GroupIcon from '../../../../assets/images/icons/group.svg'
import { getActiveClient } from '../../../../utils/redux/selectors/clients.selector'
import AtCreateListingCard from '../../../AtCard/AtCreateListingCard'

export const StyledForm = styled.div`
  background-color: ${white};
  border-radius: 5px;
`

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 5px;
  transition: 0.3s;
  width: inherit;

  &:hover {
    box-shadow: ${boxShadow};
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`

const DrawerCreateListing: React.FunctionComponent<DrawerCreateListingProps> = (
  props: DrawerCreateListingProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [step, setStep] = useState(0)
  const [openCreateListing, setOpenCreateListing] = useState(false)

  const createListing = () => {
    setOpenCreateListing(true)
  }

  const handleClose = () => {
    props.handleClose()
  }

  const handleCloseToCreateListing = () => {
    setOpenCreateListing(false)

    setTimeout(() => {
      setStep(0)
    }, 500)
  }

  return (
    <AtDrawer
      size={'100%'}
      backgroundColor={'#F7F8FE'}
      withBackdrop={true}
      open={props.open}
      handleClose={handleClose}
    >
      {!openCreateListing ?

        <Container>
          <Box
            paddingY={'30px'}
            display={'flex'}
            flexDirection={'column'}
            gap={'30px'}
          >
            <Box display={'flex'} gap={'5px'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={() => handleClose()}
              />

              <AtTypography color={grey2}>
                Back to {selectedClient.name} Listings
              </AtTypography>
            </Box>

            <AtTypography variant={'h3'}>Create Listing</AtTypography>

            <AtLine />

            <Grid container={true} justifyContent={'center'}>
              <Grid
                xs={10}
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
              >
                <StyledForm>
                  <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
                    <AtTypography variant={'h4'}>Select Project or Team</AtTypography>
                  </Box>
                  <AtLine />
                  <Grid container={true} justifyContent={'center'} gap={'20px'} padding={'20px'} flexWrap={'unset'}>
                    <AtCreateListingCard
                      listingOption={'Project'}
                      icon={FolderIcon}
                      onClick={() => createListing()}
                    />
                    <AtCreateListingCard
                      listingOption={'Team'}
                      icon={GroupIcon}
                      onClick={() => console.log('Create Team')}
                    />
                  </Grid>
                </StyledForm>
              </Grid>
            </Grid>
          </Box>
        </Container>

        :

        <CreateProjectListing
          selectedClientName={selectedClient.name}
          handleClose={handleClose}
          handleBackToCreateListing={handleCloseToCreateListing}
        />

      }
    </AtDrawer>

  )
}

interface DrawerCreateListingProps {
  open: boolean
  selectedClientName: string
  handleClose: () => void
}

export default DrawerCreateListing
