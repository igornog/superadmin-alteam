import React, { useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import AtTypography from '../components/Typography/Typography'
import styled from 'styled-components'
import StepsCard from '../components/Card/Home/StepsCard'
import StepsCardLogged from '../components/Card/Home/StepsCardLogged'
import { AddCircle, Call, Document, DocumentText } from 'iconsax-react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../components/Button/Button'
import listingIcon from './../assets/images/icons/add-1.svg'
import puzzleIcon from './../assets/images/icons/puzzle.svg'
import submitIcon from './../assets/images/icons/send-mail.svg'
import CustomLink from '../components/Link/Link'
import { useAuth0 } from "@auth0/auth0-react";
import { grey, grey6 } from '../utils/colors'
import { useNavigate } from 'react-router-dom'
import HeaderHome from '../components/Header/HeaderHome'
import Footer from '../components/Footer/Footer'
import AtLine from '../components/Line/Line'
import { capitalize } from '../utils/helpers'
import { ClientListing, ListingState, ListingStatus, ListingType } from '@yjcapp/app'
import { clientService, listingService } from '../utils/services'
import AtListingCard from '../components/Card/Listings/ListingCard'
import blueBackgroundGradient from '../assets/images/blue-background-gradient.png'
import { Client } from '../utils/redux/types/clients.type'
import CustomButton from '../components/Button/Button'

const dummyListings = [
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

const StyledBackground = styled.div`
  height: 100%;
  background-origin: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledBox = styled.div`
  display: flex; 
  flex-direction: column;
  gap: 20px;
  background-image: url(${blueBackgroundGradient});
  background-size: cover;
  background-position: center;
  border: solid 1px lightgray;
  padding: 20px;
  border-radius: 10px;

  h3, h4, p {
    background: linear-gradient(90deg, #5FE2FF 0%, #FFFFFF 55.66%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    max-width: 80%;
  }

`

const StickyHeaderMobile = styled(Box)`
  position: sticky;
  gap: 20px;
  justify-content: center;
  background-color: ${grey6};
  width: 100%;
  padding: 0;
  height: 10vh;
  display: flex;
  align-items: center;
  top: 0;
`

const Home: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const [userListings, setUserListings] = useState<ClientListing[]>()
  const [userClient, setUserClient] = useState<Client>()
  const [allListings, setAllListings] = useState<boolean>(false)
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const navigate = useNavigate()

  const getUserListings = async () => {
    const listings = await listingService.searchListing({ clientEmail: user?.email })
    const filteredListings = listings.filter((listing: ClientListing) => listing.status === ListingState.Active)
    setUserListings(!allListings || filteredListings.length === 0 ? listings : filteredListings)
  }

  useEffect(() => {
    // const getCurrentClient = async () => {
    //   const clients = await clientService.searchClient({ clientName: '' })
    //   const clientFromThisUser = clients.filter((client: Client) => client.email === user?.email)
    //   setUserClient(clientFromThisUser[0])
    // }

    // getUserListings()
    // getCurrentClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, allListings])

  useEffect(() => {
    // getUserListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledBackground>
      {!isLoading &&
        <>
          <HeaderHome />
          {isSmallScreen &&
            <StickyHeaderMobile
            >
              <AtButton
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Outlined}
                startIcon={<Call />}
                name={'Book a Call'}
                onClick={() => window.location.href = 'https://calendly.com/alteam-coaching/15min'}
              />
              <AtButton
                kind={AtButtonKind.Success}
                variant={AtButtonVariant.Contained}
                startIcon={<AddCircle />}
                name={'Create Free Listing'}
                onClick={() =>
                  isAuthenticated ?
                    userClient ?
                      navigate('/create-my-listing') :
                      navigate('/form') :
                    loginWithRedirect({
                      appState: { targetUrl: window.location.pathname + '/form' }
                    })
                }
              />
            </StickyHeaderMobile>}
          <Box
            display={'flex'}
            flexDirection={'column'}
            width={'fill-available'}
            padding={!isSmallScreen ? '30px 7vw' : '7vw 0'}
            gap={isAuthenticated ? '15px' : '30px'}
          >
            <Box
              display={'flex'}
              padding={isSmallScreen ? '0 15px' : '0'}
              flexDirection={'column'}
              gap={isAuthenticated ? '15px' : '30px'}
            >

              {user && isAuthenticated &&
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <AtTypography
                    variant={'h3'}
                    $bold
                    fontSize={'30px'}
                  >{`Welcome, ${user.given_name ?? capitalize(user.nickname ? user.nickname : '') ?? undefined}`}</AtTypography>
                  <AtTypography variant={'body1'} color={grey}>
                    {`Lorem ipsum dolor sit amet consectetur. Luctus venenatis est sit facilisi sed commodo proin vestibulum adipiscing.`}
                  </AtTypography>
                </Box>
              }

              <StyledBox>
                <AtTypography
                  variant={isAuthenticated ? 'h4' : 'h3'}
                >{`Intelligent freelance team matching`}</AtTypography>
                <AtTypography variant={'body1'}>
                  {`Welcome to our Beta freelance job listing. Create a free project or team listing for free to match with vetted talents for roles such as software engineers, UX UI designers, and product managers and find an entire elastic squad (a team of 3-12).`}
                </AtTypography>
              </StyledBox>

              <Box display={'flex'} gap={'20px'} flexWrap={'wrap'}>
                <CustomLink externalLink={'https://www.notion.so/yjcollective/Alteam-Project-b083eb357d3c40f38bc6be6617208e29?pvs=4'}>
                  <AtTypography variant="subtitle1" fontSize="16px">
                    <Document size={20} />
                    {`What's an Alteam Project?`}
                  </AtTypography>
                </CustomLink>
                <CustomLink externalLink={'https://www.notion.so/yjcollective/Alteam-Team-e84c7721063947219c81fe11766c6ea9?pvs=4'}>
                  <AtTypography variant="subtitle1" fontSize="16px">
                    <DocumentText size={20} />
                    {`What's an Alteam Team?`}
                  </AtTypography>
                </CustomLink>
              </Box>
            </Box>
            <Box
              display={'flex'}
              gap={'20px'}
              flexWrap={isSmallScreen ? 'wrap' : 'nowrap'}
              padding={isSmallScreen ? '0 30px' : '0'}
            >
              {isAuthenticated ?
                <>
                  <StepsCardLogged
                    number={1}
                    icon={listingIcon}
                    title={'Create your listing'}
                    text={
                      'You can choose between a project and team, add your company details, and fill in information about your hiring role(s). It should take you 8-12 mins to complete.'
                    }
                  />
                  <StepsCardLogged
                    number={2}
                    icon={submitIcon}
                    title={'Submit Review'}
                    text={
                      "Once you're happy, please click the button “Submit” and a member of our team will review it. To make an edit or cancel your listing, you'll have to contact YJCollective."
                    }
                  />
                  <StepsCardLogged
                    number={3}
                    icon={puzzleIcon}
                    title={'Get matches'}
                    text={
                      'We query our network of vetted freelancers & teams. We then send a talent shortlist and help arrange interviews. Like a marketplace, we take our fee when the work starts.'
                    }
                  />
                </> :
                <>
                  <StepsCard
                    number={1}
                    icon={listingIcon}
                    title={'Create your listing'}
                    text={
                      'You can choose between a project and team, add your company details, and fill in information about your hiring role(s). It should take you 8-12 mins to complete.'
                    }
                  />
                  <StepsCard
                    number={2}
                    icon={submitIcon}
                    title={'Submit Review'}
                    text={
                      "Once you're happy, please click the button “Submit” and a member of our team will review it. To make an edit or cancel your listing, you'll have to contact YJCollective."
                    }
                  />
                  <StepsCard
                    number={3}
                    icon={puzzleIcon}
                    title={'Get matches'}
                    text={
                      'We query our network of vetted freelancers & teams. We then send a talent shortlist and help arrange interviews. Like a marketplace, we take our fee when the work starts.'
                    }
                  />
                </>
              }
            </Box>

            {!isAuthenticated ?
              <Box
                display={'flex'}
                gap={'20px'}
                flexWrap={isSmallScreen ? 'wrap' : 'nowrap'}
                justifyContent={isSmallScreen ? 'center' : 'flex-end'}
              >
                <AtButton
                  kind={AtButtonKind.Default}
                  variant={AtButtonVariant.Outlined}
                  startIcon={<Call />}
                  name={'Book a Call'}
                  onClick={() => window.location.href = 'https://calendly.com/alteam-coaching/15min'}
                />
                <AtButton
                  kind={AtButtonKind.Success}
                  variant={AtButtonVariant.Contained}
                  startIcon={<AddCircle />}
                  name={'Create Free Listing'}
                  onClick={() =>
                    isAuthenticated ?
                      userClient ?
                        navigate('/create-my-listing') :
                        navigate('/form') :
                      loginWithRedirect({
                        appState: { targetUrl: window.location.pathname + '/form' }
                      })
                  }
                />
              </Box> :
              <Box margin={'20px 0 20vh'} padding={isSmallScreen ? '0 15px' : '0'} width={'fill-available'}>
                <AtLine />

                {/* {userListings?.length > 0 ? */}
                {dummyListings?.length > 0 ?
                  <Box
                    margin={'35px 0 20px'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={isSmallScreen ? 'column' : 'row'}

                  >
                    <Box display={'flex'} gap={'15px'} alignItems={'baseline'}>
                      <AtTypography variant={'h5'} $bold={true}>
                        Your Listings
                      </AtTypography>

                      {/* {userListings.find((listing: ClientListing) => listing.status === ListingState.Active) && */}
                      {dummyListings.find((listing: any) => listing.status === ListingState.Active) &&
                        <CustomButton
                          kind={AtButtonKind.Default}
                          variant={AtButtonVariant.Text}
                          fontSize={'12px'}
                          fontWeight={300}
                          onClick={() => setAllListings(!allListings)}
                          name={`${allListings ? 'Show all status' : 'Show only active listings'}`}
                        />
                      }

                    </Box>
                    <AtButton
                      kind={AtButtonKind.Success}
                      variant={AtButtonVariant.Contained}
                      startIcon={<AddCircle />}
                      name={'Create Free Listing'}
                      onClick={() =>
                        isAuthenticated ?
                          userClient ?
                            navigate('/create-my-listing') :
                            navigate('/form') :
                          loginWithRedirect({
                            appState: { targetUrl: window.location.pathname + '/form' }
                          })
                      }
                    />
                  </Box> : null}

                {/* {userListings?.length === 0 && */}
                {dummyListings?.length === 0 &&
                  <Box
                    margin={'35px 0 20px'}
                    display={'flex'}
                    justifyContent={'center'}
                  >
                    <AtButton
                      kind={AtButtonKind.Success}
                      variant={AtButtonVariant.Contained}
                      startIcon={<AddCircle />}
                      padding={'4vh 10vw'}
                      name={'Create Free Listing'}
                      onClick={() =>
                        isAuthenticated ?
                          userClient ?
                            navigate('/create-my-listing') :
                            navigate('/form') :
                          loginWithRedirect({
                            appState: { targetUrl: window.location.pathname + '/form' }
                          })
                      }
                    />
                  </Box>}

                <Box
                  justifyContent={'space-between'}
                  display={'grid'}
                  gap={'20px'}
                  gridTemplateColumns={!isSmallScreen ? 'repeat(auto-fit, minmax(400px, 1fr))' : 'repeat(auto-fit, minmax(200px, 1fr))'}
                >

                  {/* {userListings?.map((listing: ClientListing) => { */}
                  {dummyListings?.map((listing: any) => {
                    return (
                      <AtListingCard key={listing.id} listing={listing} onClick={() => navigate(`/listing/${listing.id}`)} />
                    )
                  })}
                </Box>
              </Box>
            }

          </Box>

          {!isAuthenticated &&
            <Footer />
          }
        </>
      }
    </StyledBackground>
  )
}

export default Home
