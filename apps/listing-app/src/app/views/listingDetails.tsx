import { Box, Collapse, Container, Grid, useMediaQuery } from '@mui/material'
import { ArrowDown, ArrowLeft2, ArrowUp, Edit, Status } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import CustomButton, { AtButtonVariant, AtButtonKind } from '../components/Button/Button'
import GeneralInformations from '../components/Form/ListingsForm/CreateListing/Project/steps/Preview/GeneralInformation'
import JobDescription from '../components/Form/ListingsForm/CreateListing/Project/steps/Preview/JobDescription'
import ScreeningQuestions from '../components/Form/ListingsForm/CreateListing/Project/steps/Preview/ScreeningQuestions'
import AtGroupTag from '../components/Tag/GroupTag'
import AtTypography from '../components/Typography/Typography'
import { grey2 } from '../utils/colors'
import { useNavigate, useParams } from 'react-router-dom'
import { listingService } from '../utils/services'
import { ClientListing, ListingState, ListingStatus, ListingType } from '@yjcapp/app'
import styled, { css } from 'styled-components'
import AtDropdown from '../components/Dropdown/Dropdown'
import Skills from '../components/Form/ListingsForm/CreateListing/Project/steps/Preview/Skills'
import { useAuth0 } from '@auth0/auth0-react'
import HeaderHome from '../components/Header/HeaderHome'
import ModalListingName from '../components/Modal/modals/ModalListingName'
import Roles from '../components/Form/ListingsForm/CreateListing/Team/steps/Preview/Roles'

const dummyListing = [
  {
      "id": 1,
      "soloClient": {
          "companyName": "saasd",
          "email": "igorcmnog@gmail.com",
          "fullName": "Igor Carlos Mathias Nogueira",
          "position": "asdsda"
      },
      "listingName": "My First Team Project ",
      "individuals": "2",
      "workType": "Remote",
      "timeZone": "+03:00",
      "availability": "Full Time",
      "projectLength": 12,
      "startDate": "2023-06-12T00:00:00.000Z",
      "currency": "Dollars",
      "exactRate": "40000",
      "rateFrom": null,
      "rateTo": null,
      "difficulty": "MidSenior",
      "learningLink": "google.com",
      "roles": [
          {
              "roleName": "Front End Developer",
              "description": "This is the FE Description.",
              "price": 20000,
              "percentage": 50
          },
          {
              "roleName": "Back End Developer",
              "description": "This is the BE Description.",
              "price": 20000,
              "percentage": 50
          }
      ],
      "skills": [
          "React",
          "TypeScript",
          "Jest"
      ],
      "questions": [
          "This is a screening question 1",
          "This is a screening question 2",
          "This is a screening question 3"
      ],
      "jobDescription": "This is the General Description.",
      "listingType": ListingType.Team,
      "status": ListingState.Active,
      "createdAt": "2023-05-30T13:38:41.104Z"
  }
]

const StyledCollapse = styled(Collapse) <{ $isOpen: boolean }>`
  position: relative;

  &:before {
    position: absolute;
    top: 200px;
    width: 100%;
    height: 100%;

    ${({ $isOpen }) =>
    !$isOpen &&
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

const ListingDetails: React.FunctionComponent = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentListing, setCurrentListing] = useState<ClientListing>()
  const [collapseDetails, setCollapseDetails] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:1079px)')

  // useEffect(() => {
  //   const getListing = async () => {
  //     if (id) {
  //       const listing = await listingService.searchListing({ listingId: parseInt(id) })
  //       setCurrentListing(listing[0])
  //     }
  //   }

  //   getListing()
  // }, [id])

  // const handleStatusChange = (statusValue: string) => {
  //   listingService.updateListing({ id: currentListing?.id, status: statusValue as ListingState })
  // }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isLoading &&
        <>
          <HeaderHome />
          <Container maxWidth={false}>
            <Grid container={true} padding={isSmallScreen ? '0' : '0 5vw'}>
              <Grid xs={12} item>
                <StyledCollapse
                  in={collapseDetails}
                  collapsedSize={600}
                  $isOpen={collapseDetails}
                >
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    padding={isSmallScreen ? '25px 0 0 0' : '25px 20px 25px 20px'}
                    gap={'25px'}
                  >
                    {isAuthenticated &&
                      <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                        <CustomButton
                          variant={AtButtonVariant.Contained}
                          startIcon={<ArrowLeft2 />}
                          kind={AtButtonKind.Default}
                          onClick={() => navigate('/')}
                        />
                        <AtTypography color={grey2}>
                          Back to Dashboard
                        </AtTypography>
                      </Box>}

                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      flexDirection={isSmallScreen ? 'column' : 'row'}
                      gap={isSmallScreen ? '20px' : '0'}
                    >
                      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                        <AtGroupTag
                          // label={currentListing?.soloClient.companyName}
                          label={dummyListing[0].soloClient.companyName}
                          fontSize={'14px'}
                        />
                        <AtTypography variant={'h4'} $bold>
                          {/* {currentListing?.listingName} */}
                          {dummyListing[0]?.listingName}
                        </AtTypography>
                        <Edit
                          cursor={'pointer'}
                          size={16}
                          onClick={() => setOpenModal(true)}
                        />
                      </Box>

                      <Box display={'flex'} gap={'10px'}>
                        <AtTypography color={grey2}>
                          <Status size={20} />
                          Status:
                        </AtTypography>
                        <AtDropdown
                          // placeholder={currentListing?.status}
                          placeholder={dummyListing[0]?.status}
                          $listingStatus
                          fontWeight={600}
                          disabled={!isAuthenticated}
                          fontSize={'16px'}
                          $flexibleHeight={!isSmallScreen}
                          kind={AtButtonKind.Default}
                          $listItems={
                            [
                              { id: 1, value: ListingStatus.Active, label: ListingStatus.Active },
                              { id: 2, value: ListingStatus.Disabled, label: ListingStatus.Disabled },
                              { id: 3, value: ListingStatus.Ended, label: ListingStatus.Ended },
                            ]
                          }
                          variant={AtButtonVariant.Contained}
                          // handleSelect={(e) => handleStatusChange(e.value)}
                        />
                      </Box>
                    </Box>

                    {dummyListing ?
                      <Box display={'flex'} flexDirection={'column'} gap={'25px'}>
                        <GeneralInformations
                          // listing={currentListing}
                          listing={dummyListing[0]}
                          isSmallScreen={isSmallScreen}
                          isAuthenticated={isAuthenticated}
                        />
                        <JobDescription
                          // listing={currentListing}
                          listing={dummyListing[0]}
                          isSmallScreen={isSmallScreen}
                          isAuthenticated={isAuthenticated}
                        />


                        {/* {currentListing?.listingType === ListingType.Team && */}
                        {dummyListing[0]?.listingType === ListingType.Team &&
                          <Roles
                            // listing={currentListing}
                            listing={dummyListing[0]}
                            isSmallScreen={isSmallScreen}
                            isAuthenticated={isAuthenticated}
                          />}

                        <Skills
                            // listing={currentListing}
                            listing={dummyListing[0]}
                          isSmallScreen={isSmallScreen}
                          isAuthenticated={isAuthenticated}
                        />
                        <ScreeningQuestions
                            // listing={currentListing}
                            listing={dummyListing[0]}
                          isSmallScreen={isSmallScreen}
                          isAuthenticated={isAuthenticated}
                        />
                      </Box>
                      : null}
                  </Box>
                </StyledCollapse>
                <Box display={'flex'} justifyContent={'center'} margin={'0 0 5vh'}>
                  <CustomButton
                    kind={AtButtonKind.Default}
                    variant={AtButtonVariant.Text}
                    startIcon={collapseDetails ? <ArrowUp /> : <ArrowDown />}
                    fontWeight={600}
                    name={`${collapseDetails ? 'Hide' : 'View'} All Listing Details`}
                    fontSize={'14px'}
                    onClick={() => setCollapseDetails(!collapseDetails)}
                  />
                </Box>
              </Grid>
            </Grid>

            <ModalListingName
              open={openModal}
              // listing={currentListing}
              listing={dummyListing[0]}
              onClose={() => setOpenModal(false)}
            />
          </Container>
        </>}
    </>
  )
}

export default ListingDetails
