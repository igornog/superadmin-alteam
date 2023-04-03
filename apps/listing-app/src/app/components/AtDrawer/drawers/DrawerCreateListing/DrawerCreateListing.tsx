import { Box, Container, Grid } from '@mui/material'
import { ArrowLeft2, Document, DocumentText } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { white, grey2, grey5, green } from '../../../../utils/colors'
import { boxShadow } from '../../../../utils/theme'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'
import FolderIcon from '../../../../assets/images/icons/folder.svg'
import GroupIcon from '../../../../assets/images/icons/group.svg'
import AtCreateListingCard from '../../../AtCard/AtCreateListingCard'
import CreateListing from './CreateListing'
import { ListingType } from '@yjcapp/app'
import CustomLink from '../../../AtLink/AtLink'
import { StyledLink } from '../../../../views/home'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'

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

const DrawerCreateListing: React.FC = () => {

  const [openCreateListing, setOpenCreateListing] = useState(false)
  const [listingType, setListingType] = useState<ListingType>(ListingType.Project)

  const currencClient = useAppSelector((state) => state.clients.currentClient)

  const createListing = (type: ListingType) => {
    setOpenCreateListing(true)
    setListingType(type)
  }

  const handleCloseToCreateListing = () => {
    setOpenCreateListing(false)
  }

  return (
    openCreateListing ? (
      <CreateListing
        listingType={listingType}
        steps={listingType === ListingType.Project ? 4 : 5}
        clientName={currencClient}
        handleBackToCreateListing={handleCloseToCreateListing}
      />
    ) :
      <Container>
        <Box
          paddingY={'30px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'30px'}
        >
          <Box display={'flex'} gap={'5px'}>
            <StyledLink to="/form" >
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={handleCloseToCreateListing}
              />
            </StyledLink>
            <AtTypography color={grey2}>
              Back to General Information
            </AtTypography>
          </Box>

          <AtTypography variant={'h3'}>First step: select your listing type</AtTypography>

          <AtLine />

          <Grid container justifyContent={'center'}>
            <Grid
              xs={10}
              display={'flex'}
              flexDirection={'column'}
              gap={'20px'}
            >
              <StyledForm>
                <Box
                  padding={'20px'}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <AtTypography variant={'h4'}>
                    Do you need a freelancer for a fixed project or a team for 3-24 months?
                  </AtTypography>
                </Box>
                <AtLine />
                <Grid
                  container
                  justifyContent={'center'}
                  gap={'20px'}
                  padding={'20px'}
                  flexWrap={'unset'}
                >
                  <AtCreateListingCard
                    listingOption={ListingType.Project}
                    icon={FolderIcon}
                    onClick={() => createListing(ListingType.Project)}
                  />
                  <AtCreateListingCard
                    listingOption={ListingType.Team}
                    icon={GroupIcon}
                    onClick={() => createListing(ListingType.Team)}
                  />
                </Grid>
              </StyledForm>
            </Grid>
            <Grid
              xs={10}
              marginTop={'50px'}
              display={'flex'}
              gap={'20px'}
            >
              <CustomLink>
                <AtTypography variant='subtitle1' fontSize='16px'><Document size={20} />What's an Alteam Project?</AtTypography>
              </CustomLink>
              <CustomLink>
                <AtTypography variant='subtitle1' fontSize='16px'><DocumentText size={20} /> What's an Alteam Team?</AtTypography>
              </CustomLink>
            </Grid>
          </Grid>
        </Box>
      </Container>

  )
}

export default DrawerCreateListing
