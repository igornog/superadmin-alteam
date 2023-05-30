import { Box, Container, Grid, useMediaQuery } from '@mui/material'
import { ArrowLeft2, Document, DocumentText } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { white, grey5, green, grey2 } from '../../../../utils/colors'
import { boxShadow } from '../../../../utils/theme'
import AtLine from '../../../Line/Line'
import AtTypography from '../../../Typography/Typography'
import FolderIcon from '../../../../assets/images/icons/folder.svg'
import GroupIcon from '../../../../assets/images/icons/group.svg'
import CreateListing from '.'
import { ListingType } from '@yjcapp/app'
import CustomLink from '../../../Link/Link'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../utils/redux/selectors/clients.selector'
import Header from '../../../Header/Header'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../Button/Button'
import { useNavigate } from 'react-router-dom'
import AtCreateListingCard from '../../../Card/Listings/CreateListingCard'
import { clientService } from '../../../../utils/services'
import { Client } from '../../../../utils/redux/types/clients.type'

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

const CreateListingStart: React.FC = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const [openCreateListing, setOpenCreateListing] = useState(false)
  const [lastClient, setLastClient] = useState<Client>()
  const [listingType, setListingType] = useState<ListingType>(
    ListingType.Project,
  )
  
  const activeClient = useAppSelector((state) => getActiveClient(state))

  // useEffect(() => {
  //   const getLastClient = async () => {
  //       const client = await clientService.searchClient({ clientName: '' })
  //       setLastClient(client[0])
  //   }

  //   getLastClient()
  // }, [])

  const createListing = (type: ListingType) => {
    setOpenCreateListing(true)
    setListingType(type)
  }

  const handleCloseToCreateListing = () => {
    setOpenCreateListing(false)
  }

  return (
    <>
      <Header />
      {openCreateListing? (
        <CreateListing
          listingType={listingType}
          steps={listingType === ListingType.Project ? 5 : 6}
          client={activeClient ? activeClient : lastClient}
          isSmallScreen={isSmallScreen}
          handleBackToCreateListing={handleCloseToCreateListing}
        />
      ) : (
        <Container>
          <Box
            paddingY={'30px'}
            display={'flex'}
            flexDirection={'column'}
            gap={'30px'}
          >
            <Box display={'flex'} gap={'7px'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={() => navigate('/')}
              />
              <AtTypography color={grey2}>Back to Dashboard</AtTypography>
            </Box>

            <AtTypography
              variant={'h3'}
              $bold
              fontSize={isSmallScreen ? '1.5rem' : '2rem'}
            >
              First step: select your listing type
            </AtTypography>

            <AtLine />

            <Grid container justifyContent={'center'}>
              <Grid
                item={true}
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
                width={'100%'}
              >
                <StyledForm>
                  <Box
                    padding={'20px'}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    <AtTypography
                      variant={'h4'}
                      fontSize={isSmallScreen ? '1rem' : '1.5rem'}
                    >
                      Do you need a freelancer for a fixed project or a team for
                      3-24 months?
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
                item={true}
                marginTop={'50px'}
                display={'flex'}
                gap={'20px'}
                flexWrap={'wrap'}
                width={'100%'}
                justifyContent={'center'}
              >
                <CustomLink externalLink={'https://www.notion.so/yjcollective/Alteam-Project-b083eb357d3c40f38bc6be6617208e29?pvs=4 '}>
                  <AtTypography
                    variant="subtitle1"
                    fontSize={isSmallScreen ? '14px' : '1rem'}
                  >
                    <Document size={20} />
                    What's an Alteam Project?
                  </AtTypography>
                </CustomLink>
                <CustomLink externalLink={'https://www.notion.so/yjcollective/Alteam-Team-e84c7721063947219c81fe11766c6ea9?pvs=4'}>
                  <AtTypography
                    variant="subtitle1"
                    fontSize={isSmallScreen ? '14px' : '1rem'}
                  >
                    <DocumentText size={20} /> What's an Alteam Team?
                  </AtTypography>
                </CustomLink>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  )
}

export default CreateListingStart
