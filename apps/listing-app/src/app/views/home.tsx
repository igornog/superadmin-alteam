import React from 'react'
import { Box } from '@mui/material'
import AtTypography from '../components/AtTypography/AtTypography'
import styled from 'styled-components'
import Header from '../components/AtHeader/AtHeader'
import CustomCard from '../components/AtCard/AtCard'
import { AddCircle, Call, Document, DocumentText } from 'iconsax-react'
import AtButton, { AtButtonKind, AtButtonVariant } from '../components/AtButton/AtButton'
import Footer from '../components/AtFooter/AtFooter'
import listingIcon from './../assets/images/icons/add-1.svg'
import puzzleIcon from './../assets/images/icons/puzzle.svg'
import submitIcon from './../assets/images/icons/send-mail.svg'
import CustomLink from '../components/AtLink/AtLink'
import { Link } from 'react-router-dom'

const StyledBackground = styled.div`
  height: 100%;
  background-origin: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
`

const Home: React.FC = () => {
  return (
    <StyledBackground>
      <Header />
      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={'30px 15vw'}
        gap={'30px'}
      >
        <Box display={'flex'}
          flexDirection={'column'}
          gap={'30.5px'}>
          <Box display={'flex'}
            flexDirection={'column'}
            gap={'20px'}>
            <AtTypography variant={'h3'}>{`Intelligent freelance team matching`}</AtTypography>
            <AtTypography variant={'body1'}>
              {`Welcome to our Beta freelance job listing. Create a free project or team listing for free to match with vetted talents for roles such as software engineers, UX UI designers, and product managers and find an entire elastic squad (a team of 3-12).`}
            </AtTypography>
          </Box>
          <Box display={'flex'} gap={'20px'}>
            <CustomLink>
              <AtTypography variant='subtitle1' fontSize='16px'><Document size={20} />{`What's an Alteam Project?`}</AtTypography>
            </CustomLink>
            <CustomLink>
              <AtTypography variant='subtitle1' fontSize='16px'><DocumentText size={20} />{`What's an Alteam Team?`}</AtTypography>
            </CustomLink>
          </Box>
        </Box>
        <Box display={'flex'} gap={'20px'}>
          <CustomCard number={1} icon={listingIcon} title={'Create your listing'} text={'You can choose between a project and team, add your company details, and fill in information about your hiring role(s). It should take you 8-12 mins to complete.'} />
          <CustomCard number={2} icon={submitIcon} title={'Submit Review'} text={"Once you're happy, please click the button “Submit” and a member of our team will review it. To make an edit or cancel your listing, you'll have to contact YJCollective."} />
          <CustomCard number={3} icon={puzzleIcon} title={'Get matches'} text={'We query our network of vetted freelancers & teams. We then send a talent shortlist and help arrange interviews. Like a marketplace, we take our fee when the work starts.'} />
        </Box>
        <Box display={'flex'} gap={'20px'} justifyContent={'flex-end'}>
          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            startIcon={<Call />}
            name={'Book a Call'}
          // onClick={() => setOpenDrawerCreateClient(true)}
          />
          <StyledLink to="/form" >
            <AtButton
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              startIcon={<AddCircle />}
              name={'Create Free Listing'}
            />
          </StyledLink>
        </Box>
      </Box>
      <Footer />
    </StyledBackground>
  )
}

export default Home

