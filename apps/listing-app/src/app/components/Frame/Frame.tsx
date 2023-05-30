import { Box } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { black, green } from '../../utils/colors'
import AtTypography from '../Typography/Typography'

const StyledFrame = styled(Box)`
  border-radius: 5px;
`

const StyledBox = styled(Box)`
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: ${green};
  }
`

const AtFrame: React.FC<TalentFrameProps> = (props: TalentFrameProps) => {
  return (
    <StyledFrame
      display={'flex'}
      gap={props.gap ?? '10px'}
      flexDirection={'column'}
      padding={props.padding ?? '20px'}
      bgcolor={props.backgroundColor ?? black}
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
  backgroundColor?: string
  padding?: string
}

export default AtFrame
