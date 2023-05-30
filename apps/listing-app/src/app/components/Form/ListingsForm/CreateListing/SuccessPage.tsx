import { Box, useMediaQuery } from '@mui/material'
import { ArrowRight } from 'iconsax-react'
import styled from 'styled-components'
import SmallRocket from '../../../../assets/images/icons/small_rocket.svg'
import Rocketbg from '../../../../assets/images/icons/background_rocket.svg'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../Button/Button'
import AtTypography from '../../../Typography/Typography'
import { useNavigate } from 'react-router-dom'

const StyledBox = styled(Box)`
  background-image: url(${Rocketbg});
  background-repeat: no-repeat;
  height: 100vh;
  background-origin: content-box;
  background-position: center;
`

const FinalStep = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:1079px)')

  return (
    <StyledBox>
      <Box
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        textAlign={'center'}
        gap={'20px'}
      >
        <img src={SmallRocket} alt={'Small Rocket'} />
        <AtTypography variant={'h3'}>Successfully Created</AtTypography>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'}
          padding={isSmallScreen ? '0 15px' : '0 35vw'}
          justifyContent={'center'}
          textAlign={'center'}
        >
          <AtTypography variant={'body1'} color={'#6F737D'}>
            Thank you for your submission. We will get back to you within 2-5
            working days
          </AtTypography>
          <AtTypography variant={'body1'} color={'#6F737D'}>
            What happened next? Once your listing is approved we’ll start
            sharing it with our freelancer and teams network
          </AtTypography>
        </Box>
          <AtButton
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={`See my listings`}
            endIcon={<ArrowRight />}
            onClick={() => navigate('/')}
          />
      </Box>
    </StyledBox>
  )
}

export default FinalStep
