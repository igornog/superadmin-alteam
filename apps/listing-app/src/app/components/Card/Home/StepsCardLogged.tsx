import React from 'react'
import { Box, Card } from '@mui/material'
import styled from 'styled-components'
import AtTypography from '../../Typography/Typography'
import { grey } from '@mui/material/colors'

const StyledCard = styled(Card)`
  width: 100%;
  height: auto;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;

  p {
    color: ${grey}
    line-height: 1.25rem;
  }
`

const StepCard: React.FC<Props> = (props: Props) => {
  return (
    <StyledCard>
      <Box display={'flex'} gap={'10px'}>
        <img src={props.icon} alt={'logo'} width={24} />
        <AtTypography variant="h5" fontSize='16px'>
          {props.number}. {props.title}
        </AtTypography>
      </Box>
      <Box paddingLeft={'34px'}>
        <AtTypography fontSize='12px'>{props.text}</AtTypography>
      </Box>
    </StyledCard>
  )
}

interface Props {
  number: number
  icon: string
  title: string
  text: string
}

export default StepCard
