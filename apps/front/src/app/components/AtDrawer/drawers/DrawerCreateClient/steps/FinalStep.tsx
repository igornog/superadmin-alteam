import { Box } from '@mui/material'
import { ArrowRight } from 'iconsax-react'
import React from 'react'
import styled from 'styled-components'
import Rocketbg from '../../../../../assets/images/icons/background_rocket.svg'
import SmallRocket from '../../../../../assets/images/icons/small_rocket.svg'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../AtButton/AtButton'
import AtTypography from '../../../../AtTypography/AtTypography'

const StyledBox = styled(Box)`
  background-image: url(${Rocketbg});
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  padding: 30px 0;
  background-origin: content-box;
  background-position: center;
`

const FinalStep: React.FunctionComponent<FinalStepProps> = (
  props: FinalStepProps,
) => {
  return (
    <StyledBox>
      <Box
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'20px'}
      >
        <img src={SmallRocket} alt={'Small Rocket'} />
        <AtTypography variant={'h3'}>Successfully Created</AtTypography>
        <AtButton
          kind={AtButtonKind.Success}
          variant={AtButtonVariant.Contained}
          name={'Go to Client Requests'}
          endIcon={<ArrowRight />}
          onClick={props.handleClose}
        />
      </Box>
    </StyledBox>
  )
}

interface FinalStepProps {
  handleClose: () => void
}

export default FinalStep
