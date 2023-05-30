import React from 'react'
import { Card } from '@mui/material'
import styled from 'styled-components'
import AtTypography from '../../Typography/Typography'
import { grey } from '@mui/material/colors'

const StyledCard = styled(Card)`
  width: 100%;
  height: auto;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  border-radius: 5px;

  p {
    color: ${grey}
  }
`

const StepCard: React.FC<Props> = (props: Props) => {
  return (
    <StyledCard>
      < img src={props.icon} alt={'logo'} width={40} />
      <AtTypography variant="h5">
        {props.number}. {props.title}
      </AtTypography>
      <AtTypography>{props.text}</AtTypography>
    </StyledCard >
  )
}

interface Props {
  number: number
  icon: string
  title: string
  text: string
}

export default StepCard
