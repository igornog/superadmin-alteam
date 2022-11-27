import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { blue, green } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'
import AtTypography from '../AtTypography/AtTypography'

const StyledFrame = styled(Box)`
  background-color: ${convertHexToRGBA(blue, 0.05)};
  border-radius: 5px;
  padding: 20px;
`

const StyledBox = styled(Box)`
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: ${green};
  }
`

const AtTalentFrame: React.FunctionComponent<TalentFrameProps> = (
  props: TalentFrameProps,
) => {
  return (
    <StyledFrame
      display={'flex'}
      gap={props.gap ?? '10px'}
      flexDirection={'column'}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h5'}>{props.title}</AtTypography>
        <StyledBox onClick={props.onClick}>{props.icon}</StyledBox>
      </Box>
      {props.children}
    </StyledFrame>
  )
}

interface TalentFrameProps {
  children: React.ReactNode
  title?: string
  icon?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  gap?: number
}

export default AtTalentFrame
